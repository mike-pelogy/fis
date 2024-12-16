import gql from "graphql-tag";

export const categoriesQuery = gql(`
query categoriesQuery {
  categories(where: {include: [4, 5, 6, 7]}) {
    edges {
      node {
        slug
      }
    }
  }
}
`);
