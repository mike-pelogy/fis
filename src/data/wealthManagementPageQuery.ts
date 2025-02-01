import gql from "graphql-tag";

export const wealthManagementPageQuery = gql(`
query wealthManagementPage {
  page(id: "2833", idType: DATABASE_ID) {
    wealthManagement {
      services {
        services {
          title
          description
        }
        title
      }
      introduction {
        title
        description
        cta {
          url
          title
          target
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
      }
    }
  }
}
`);
