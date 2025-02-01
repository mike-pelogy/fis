import gql from "graphql-tag";

export const brifPageQuery = gql(`
query BRIFPageQuery {
  page(idType: DATABASE_ID, id: "2825") {
    brif {
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
        data {
          primaryExchange
          isin
          index
          gross
          fundInception
          distributionFrequency
        }
        fundResources {
          title
          file {
            altText
            mediaItemUrl
            title
          }
        }
      }
      documents {
        legal {
          title
          file {
            altText
            title
            mediaItemUrl
          }
        }
        fundResources {
          title
          file {
            altText
            title
            mediaItemUrl
          }
        }
      }
      distributionsCopy {
        title
        file {
          mediaItemUrl
        }
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
