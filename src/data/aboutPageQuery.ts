import gql from "graphql-tag";

export const teamQuery = gql(`
query teams {
  teams(first: 99, where: {orderby: {field: DATE, order: ASC}}) {
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
page(idType: DATABASE_ID, id: "2798") {
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
      image {
        altText
        mediaItemUrl
      }
    }
  }
}
`);
