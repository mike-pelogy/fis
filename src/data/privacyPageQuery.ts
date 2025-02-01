import gql from "graphql-tag";

export const privacyPageQuery = gql(`
query privacyPage {
  page(id: "2831", idType: DATABASE_ID) {
    title
    content
  }
}
`);
