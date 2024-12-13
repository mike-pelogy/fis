import gql from "graphql-tag";

export const aboutPageQuery = gql(`
query Aboutpage {
page(idType: DATABASE_ID, id: "52") {
  aboutPage {
      valuesCopy {
        title
        description
      }
      values {
        title
        description
      }
      mission {
        title
        description
      }
    }
  }
}
`);
