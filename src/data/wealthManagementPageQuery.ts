import gql from "graphql-tag";

export const wealthManagementPageQuery = gql(`
query wealthManagementPage {
  page(id: "57", idType: DATABASE_ID) {
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
    }
  }
}
`);
