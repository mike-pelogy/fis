import gql from "graphql-tag";

export const individualPageQuery = gql(`
query individualPage {
  page(id: "2841", idType: DATABASE_ID) {
    individual {
      individuals {
        title
        description
      }
    }
  }
}
`);
