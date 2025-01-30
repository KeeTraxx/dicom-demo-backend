import { DataTypes, ForeignKey } from "sequelize";

import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Patient } from "../patient/patient-sequelize";

import { sequelize } from "../../config/sequelize";

export class DicomFile extends Model<InferAttributes<DicomFile>, InferCreationAttributes<DicomFile>> {
    declare id: CreationOptional<string>;
    declare fileName: string;
    declare studyDate: Date | null;
    declare studyTime: number | null;
    declare studyDescription: string | null;
    declare seriesDate: Date | null;
    declare seriesTime: number | null;
    declare seriesDescription: number | null;
    declare physicianName: string | null;
    declare manufacturer: string | null;
    declare manufacturerModelName: string | null;
    declare modality: string | null;
    declare payload: Buffer;
    declare createdAt: CreationOptional<Date>;
    declare patientId: ForeignKey<Patient["id"]>;
}

DicomFile.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    fileName: DataTypes.STRING,
    studyDate: DataTypes.DATE,
    studyTime: DataTypes.INTEGER,
    studyDescription: DataTypes.STRING,
    seriesDate: DataTypes.DATE,
    seriesTime: DataTypes.INTEGER,
    seriesDescription: DataTypes.STRING,
    physicianName: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    manufacturerModelName: DataTypes.STRING,
    payload: DataTypes.BLOB,
    modality: DataTypes.STRING,
    createdAt: DataTypes.DATE
}, { sequelize });

sequelize.sync();
