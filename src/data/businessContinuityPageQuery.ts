import gql from "graphql-tag";

export const businessContinuityPageQuery = gql(`
query businessContinuityPageQuery {
  page(id: "3251", idType: DATABASE_ID) {
    businessContinuity {
      introduction
      collaboration {
        title
        description
        image {
          altText
          mediaItemUrl
        }
      }
    }
  }
}
`);
