import gql from "graphql-tag";
import { DicomFile } from "./dicom-file-sequelize";

export const dicomFileTypeDefs = gql`
    type DicomFile {
        id: ID!
        fileName: String
        studyDate: Date
        studyTime: Float
        studyDescription: String
        seriesDate: Date
        seriesTime: Float
        seriesDescription: String
        physicianName: String
        manufacturer: String
        manufacturerModelName: String
        modality: String
        createdAt: String!
    }

    type Query {
        dicomFiles(patientId: ID): [DicomFile!]!
    }
`

export const dicomFileResolvers = {
    Query: {
        dicomFiles: async (_: any, { patientId }: any) => await DicomFile.findAll({ where: { patientId } }),
    },
}

