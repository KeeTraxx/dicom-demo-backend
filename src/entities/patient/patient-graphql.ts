import gql from "graphql-tag";
import { Patient } from "./patient-sequelize";
import { DicomFile } from "../dicom-file/dicom-file-sequelize";

export const patientTypeDefs = gql`
    type Patient {
        id: ID!
        name: String!
        birthDate: Date
        sex: String
        age: String
        weight: String
        createdAt: DateTimeISO!
        DicomFiles: [DicomFile!]!
    }

    type Query {
        patients: [Patient!]!
        patient(id: ID!): Patient
    }
`

export const patientResolvers = {
    Query: {
        patients: async () => await Patient.findAll(),
        patient: async (_: any, { id }: any) => {
            const res = await Patient.findByPk(id, {include: DicomFile, plain: true});
            return res.toJSON();
        },
    },
}

