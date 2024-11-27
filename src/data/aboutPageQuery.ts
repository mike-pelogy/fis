import gql from "graphql-tag";

export const aboutPageQuery = gql(`
query Aboutpage {
page(idType: DATABASE_ID, id: "52") {
  aboutPage {
      valuesCopy {
        description
        title
      }
      values {
        description
        title
      }
      mission {
        description
        title
      }
    }
  }
}
`);
