import gql from "graphql-tag";

export const investmentManagementPageQuery = gql(`
query investmentManagementPage {
  page(id: "2845", idType: DATABASE_ID) {
    title
    investmentManagement {
      wealthTransition {
        title
        description
      }
      ourProcess {
        title
        description
      }
      ourPortfolios {
        title
        description
      }
      investmentPhilosophy {
        title
        description
      }
      howWeServe {
        title
        description
      }
    }
  }
}
`);
