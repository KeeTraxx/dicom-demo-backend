import { DataTypes, Sequelize } from "sequelize";

import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { DicomFile } from "../dicom-file/dicom-file-sequelize";


import {sequelize} from "../../config/sequelize";

export class Patient extends Model<InferAttributes<Patient>, InferCreationAttributes<Patient>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
}

Patient.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE
}, { sequelize });

Patient.hasMany(DicomFile, {foreignKey: 'patientId'});

sequelize.sync();
