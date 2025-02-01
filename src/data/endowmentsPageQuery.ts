import gql from "graphql-tag";

export const endowmentsPageQuery = gql(`
query endowmentsPageQuery {
  page(id: "189", idType: DATABASE_ID) {
    endowments {
      connectWithUs {
        description
        title
      }
      introduction
      howFisHelps {
        title
        description
      }
      goverance {
        title
        description
      }
      educationAndACultureOfPhilanthropy {
        title
        description
      }
    }
  }
}
`);
