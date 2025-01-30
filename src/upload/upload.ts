import { Request, Response } from "express";
import daikon from 'daikon';
import { Patient } from "../entities/patient/patient-sequelize";
import { DicomFile } from "../entities/dicom-file/dicom-file-sequelize";

export async function upload(req: Request, res: Response) {
    const image = daikon.Series.parseImage(new DataView(req.body.buffer));
    const fileName = req.get('x-original-file-name') ?? 'no-name.dcm';

    const birthDate = image.getTag(0x0010, 0x0030).value[0];

    const seriesDate = image.getTag(0x0008, 0x0021).value[0];
    const seriesTime = image.getTag(0x0008, 0x0031).value[0];

    const manufacturer = image.getTag(0x0008, 0x0070).value[0];
    const manufacturerModelName = image.getTag(0x0008, 0x1090).value[0];
    const physicianName = image.getTag(0x0008, 0x0090).value[0];

    const studyDescription = image.getTag(0x0008, 0x1030).value[0];
    const seriesDescription = image.getTag(0x0008, 0x103e).value[0];

    const patientSex = image.getTag(0x0010, 0x0040).value[0];
    const patientAge = image.getTag(0x0010, 0x1010).value[0];
    const patientWeight = image.getTag(0x0010, 0x1030).value[0];

    try {
        const where = image.getPatientID() ? { id: image.getPatientID() } : { name: image.getPatientName() };

        const [patientInstance] = await Patient.findOrCreate({
            where,
            defaults: {
                id: image.getPatientID() ?? crypto.randomUUID(),
                birthDate,
                name: image.getPatientName(),
                sex: patientSex,
                age: patientAge,
                weight: patientWeight
            }
        });

        const dicomFileInstance = await DicomFile.create({
            fileName,
            studyDate: image.getStudyDate(),
            studyTime: image.getStudyTime(),
            payload: Buffer.from(new Uint8Array(req.body.buffer)),
            modality: image.getModality(),
            patientId: patientInstance.dataValues.id,
            studyDescription,
            seriesDate,
            seriesTime,
            manufacturer,
            manufacturerModelName,
            physicianName,
            seriesDescription
        });

        res.send({
            patient: patientInstance.dataValues,
            dicomFile: { ...dicomFileInstance.dataValues, payload: undefined }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}