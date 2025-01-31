import gql from "graphql-tag";

export const contactPageQuery = gql(`
query contactPage {
  page(id: "46", idType: DATABASE_ID) {
    title
    contactPage {
      contact {
        email
        location
        phone
      }
      subscribe {
        title
        description
      }
    }
  }
}
`);
