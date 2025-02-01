import gql from "graphql-tag";

export const prayPageQuery = gql(`
query PrayPage {
  page(idType: DATABASE_ID, id: "2823") {
    pray {
      landing {
        title
        subtitle
        description
        cta {
          target
          title
          url
        }
      }
      performance {
        monthlyDisclaimer
        quarterlyDisclaimer
      }
      pricing {
        title
        premiumOrDiscountInfo {
          url
          title
        }
      }
      overview {
        title
        investmentObjectives
        description
        fundResources {
          file {
            altText
            mediaItemUrl
            title
          }
        }
        data {
          primaryExchange
          isin
          index
          gross
          fundInception
          distributionFrequency
        }
      }
      documents {
        legal {
          file {
            altText
            title
            mediaItemUrl
          }
        }
        fundResources {
          file {
            altText
            title
            mediaItemUrl
          }
        }
      }
      distributionsCopy {
        title
        download {
          url
          title
        }
      }
      distributions {
        title
        data {
          daySecYield
          perYear {
            recordDate
            payableDate
            fieldGroupName
            exDivDate
            amount
          }
        }
      }
      dataReference {
        dailyNav {
          mediaItemUrl
        }
        monthlyPerformance {
          mediaItemUrl
        }
        quarterlyPerformance {
          mediaItemUrl
        }
      }
    }
    title
    customerFooter {
      customFooter
    }
  }
}
`);
