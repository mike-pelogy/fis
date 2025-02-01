import gql from "graphql-tag";

export const contactPageQuery = gql(`
query contactPage {
  page(id: "2815", idType: DATABASE_ID) {
    title
    contactPage {
      contact {
        email
        location
        phone
      }
      subscribe {
        title
        image {
          altText
          mediaItemUrl
        }
        description
      }
    }
  }
}
`);
