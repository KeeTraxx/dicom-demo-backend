import gql from "graphql-tag";
import { DicomFile } from "./dicom-file-sequelize";

export const dicomFileTypeDefs = gql`
    type DicomFile {
        id: ID!
        fileName: String!
        studyDate: String!
        studyTime: Int!
        patientId: ID!
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

