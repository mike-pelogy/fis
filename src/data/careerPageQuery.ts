import gql from "graphql-tag";

export const careerPageQuery = gql(`
query careersPage {
  page(id: "2818", idType: DATABASE_ID) {
    title
    careersPage {
      description
      image {
        altText
        mediaItemUrl
      }
      subscribe {
        title
        description
      }
    }
  }
}
`);

