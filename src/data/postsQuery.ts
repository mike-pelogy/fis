import gql from "graphql-tag";

export const postsQuery = gql(`
query postsQuery {
  posts(first: 999) {
    edges {
      node {
        slug
      }
    }
  }
}`);
