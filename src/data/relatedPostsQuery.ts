import gql from "graphql-tag";

export const relatedPostsQuery = gql(`
query relatedPostQuery($notIn: [ID], $after: String) {
  posts(first: 3, where: {notIn: $notIn}, after: $after) {
    edges {
      cursor
      node {
        slug
        title
        databaseId
      }
    }
  }
}
`);

