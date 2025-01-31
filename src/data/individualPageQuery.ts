import gql from "graphql-tag";

export const individualPageQuery = gql(`
query individualPage {
  page(id: "180", idType: DATABASE_ID) {
    individual {
      individuals {
        title
        description
      }
    }
  }
}
`);
