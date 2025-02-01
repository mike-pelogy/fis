import gql from "graphql-tag";

export const wealthManagementPageQuery = gql(`query wealthManagementPage {
  page(id: "2833", idType: DATABASE_ID) {
    wealthManagement {
      services {
        services {
          title
          description
        }
        title
        diagram {
          altText
          mediaItemUrl
        }
      }
      introduction {
        title
        description
        cta {
          url
          title
          target
        }
        image {
          altText
          mediaItemUrl
        }
      }
      modal {
        title
        redirectUrl
        description
      }
      cta {
        title
        description
        image {
          altText
          mediaItemUrl
        }
      }
    }
  }
}`);
