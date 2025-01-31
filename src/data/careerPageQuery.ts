import gql from "graphql-tag";

export const careerPageQuery = gql(`
query careersPage {
  page(id: "49", idType: DATABASE_ID) {
    title
    careersPage {
      description
      subscribe {
        title
        description
      }
    }
  }
}
`);

