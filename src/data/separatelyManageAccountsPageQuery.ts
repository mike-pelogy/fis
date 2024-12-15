import gql from "graphql-tag";

export const separatelyManageAccountsPageQuery = gql(`
query separatelyManageAccountsPageQuery {
  page(id: "192", idType: DATABASE_ID) {
    separatelyManagedAccountsSma {
      top5Reasons {
        title
        reasonsCopy
        reasons
      }
      howToAccessFisForSmas {
        title
        description
      }
      dueDiligenceForFinancialAdvisors {
        title
        description
      }
      dueDiligence {
        quote
        description
        descriptionMore
        title
      }
    }
  }
}`);

