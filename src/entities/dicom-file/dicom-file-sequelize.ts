import { DataTypes, ForeignKey } from "sequelize";

import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Patient } from "../patient/patient-sequelize";

import { sequelize } from "../../config/sequelize";

export class DicomFile extends Model<InferAttributes<DicomFile>, InferCreationAttributes<DicomFile>> {
    declare id: CreationOptional<string>;
    declare fileName: string;
    declare studyDate: Date;
    declare studyTime: number;
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
    payload: DataTypes.BLOB,
    studyDate: DataTypes.DATE,
    studyTime: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
}, { sequelize });

sequelize.sync();
