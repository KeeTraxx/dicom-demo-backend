import { DataTypes, Sequelize } from "sequelize";

import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { DicomFile } from "../dicom-file/dicom-file-sequelize";


import {sequelize} from "../../config/sequelize";

export class Patient extends Model<InferAttributes<Patient>, InferCreationAttributes<Patient>> {
    declare id: string;
    declare name: string;
    declare birthDate: Date;
    declare sex: string | null;
    declare age: number | null;
    declare weight: number | null;
    declare createdAt: CreationOptional<Date>;
}

Patient.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
}, { sequelize });

Patient.hasMany(DicomFile, {foreignKey: 'patientId'});

sequelize.sync();
