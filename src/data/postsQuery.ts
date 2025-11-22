import gql from "graphql-tag";

export const postsQuery = gql(`
query postsQuery($after: String) {
  posts(first: 100, after: $after) {
    edges {
      cursor
      node {
        slug
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}`);
