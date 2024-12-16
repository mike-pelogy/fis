import gql from "graphql-tag";

export const teamQuery = gql(`
query teams {
  teams(first: 99) {
    edges {
      node {
        content
        title
        slug
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        teamMember {
          phone
          email
          titles {
            title
          }
        }
      }
    }
  }
}
`);

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
