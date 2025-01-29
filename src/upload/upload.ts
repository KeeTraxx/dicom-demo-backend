import { Request, Response } from "express";
import daikon from 'daikon';
import { Patient } from "../entities/patient/patient-sequelize";
import { DicomFile } from "../entities/dicom-file/dicom-file-sequelize";

export async function upload(req: Request, res: Response) {
    const image = daikon.Series.parseImage(new DataView(req.body.buffer));
    const fileName = req.get('x-original-file-name') ?? 'no-name.dcm';

    try {
    const [patientInstance] = await Patient.findOrCreate({ where: { name: image.getPatientName() } });

    const dicomFileInstance = await DicomFile.create({
        fileName,
        studyDate: image.getStudyDate(),
        studyTime: image.getStudyTime(),
        payload: Buffer.from( new Uint8Array(req.body.buffer)),
        patientId: patientInstance.dataValues.id
    });

    res.send({
        patient: patientInstance.dataValues,
        dicomFile: {...dicomFileInstance.dataValues, payload: undefined}
    });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}