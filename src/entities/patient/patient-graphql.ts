import gql from "graphql-tag";
import { Patient } from "./patient-sequelize";

export const patientTypeDefs = gql`
    type Patient {
        id: ID!
        name: String!
        createdAt: String!
    }

    type Query {
        patients: [Patient!]!
        patient(id: ID!): Patient
    }
`

export const patientResolvers = {
    Query: {
        patients: () => Patient.findAll(),
        patient: (_: any, { id }: any) => Patient.findByPk(id),
    },
}

