import gql from "graphql-tag";

export const catIdQuery = gql(`
query getCategoryId($slug: [String]) {
  categories(where: {slug: $slug}) {
    edges {
      node {
        databaseId
      }
    }
  }
}
`);

export const moreNewsInsightsQuery = gql(`
query relatedPostQuery($categoryId: Int, $after: String) {
  posts(first: 9, where: {categoryId: $categoryId}, after: $after) {
    edges {
      cursor
      node {
        title
        slug
        date
        categories {
          edges {
            node {
              slug
              name
              databaseId
            }
          }
        }
        featuredImage {
          node {
            altText
            title
            mediaItemUrl
          }
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
`);


export const newsInsightsQuery = gql(`
query relatedPostQuery($categoryId: Int) {
  posts(first: 5, where: {categoryId: $categoryId}) {
    edges {
      cursor
      node {
        title
        slug
        date
        categories {
          edges {
            node {
              slug
              name
              databaseId
            }
          }
        }
        featuredImage {
          node {
            altText
            title
            mediaItemUrl
          }
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
`);
