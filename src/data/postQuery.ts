import gql from "graphql-tag";

export const postQuery = gql(`
query postQuery($slug: String) {
  postBy(slug: $slug) {
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    content
    categories(first: 9999) {
      edges {
        node {
          slug
          name
        }
      }
    }
    databaseId
    title
    slug
    date
  }
}
`);
