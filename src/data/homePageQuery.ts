import gql from "graphql-tag";

export const homePagePostsQuery = gql(`
query relatedPostQuery($first: Int = 5) {
  posts(first: $first) {
    edges {
      node {
        title
        slug
        date
        categories {
          edges {
            node {
              slug
              name
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
  }
}
`);

export const homePageQuery = gql(`query Homepage {
  page(idType: DATABASE_ID, id: "2829") {
    homepage {
      aboutSection {
        callToAction {
          url
          title
          target
        }
        title
        video
        description
      }
      landing {
        title
        description
        callToAction {
          target
          title
          url
        }
        image {
          mediaItemUrl
          altText
        }
      }
      services {
        title
        investment {
          title
          fieldGroupName
          description
          callToAction {
            url
            title
            target
          }
          image {
            altText
            mediaItemUrl
          }
        }
        wealthManagement {
          title
          services {
            title
            description
          }
          description
          callToAction {
            url
            title
            target
          }
          image {
            altText
            mediaItemUrl
          }
        }
      }
      latestNewAndInsights {
        link {
          title
          url
        }
        title
      }
      contactUsCtaSimple {
        description
        link {
          title
          url
        }
        title
      }
    }
  }
}`);
