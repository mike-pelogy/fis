import gql from "graphql-tag";

export const separatelyManageAccountsPageQuery = gql(`query separatelyManageAccountsPageQuery {
  page(id: "2847", idType: DATABASE_ID) {
    separatelyManagedAccountsSma {
      top5Reasons {
        title
        reasonsCopy
        reasons
        image {
          altText
          mediaItemUrl
        }
      }
      howToAccessFisForSmas {
        title
        description
      }
      dueDiligenceForFinancialAdvisors {
        title
        description
        image {
          altText
          mediaItemUrl
        }
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

