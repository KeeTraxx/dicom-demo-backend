import { Request, Response } from "express";
import { DicomFile } from "../entities/dicom-file/dicom-file-sequelize";

export async function fetch(req: Request, res: Response) {
    try {

        const dicomFileInstance = await DicomFile.findByPk(req.params.id);
        res.header('Content-Type', 'application/dicom');
        res.header('Content-Disposition', `attachment; filename=${dicomFileInstance.dataValues.fileName}`);
        res.status(200);
        res.end(dicomFileInstance.dataValues.payload);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}