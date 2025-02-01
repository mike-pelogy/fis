import gql from "graphql-tag";

export const kocgPageQuery = gql(`
query KocgPage {
page(idType: DATABASE_ID, id: "2827") {
  kocg {
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
      values {
        moreInfo {
          url
          title
        }
        investmentPolicy
        guidelines
        description
        video
      }
      quote {
        quote
        description
      }
      pricing {
        title
        premiumOrDiscountInfo {
          url
          title
        }
      }
      performance {
        quarterlyDisclaimer
        monthlyDisclaimer
      }
      overview {
        title
        investmentObjectives
        fundResources {
          file {
            altText
            title
            mediaItemUrl
          }
          title
        }
        description
        data {
          primaryExchange
          isin
          index
          gross
          fundInception
          distributionFrequency
        }
      }
      landing {
        title
        subtitle
        description
        video
        cta {
          url
          title
        }
      }
      documents {
        legal {
          file {
            altText
            title(format: RAW)
            mediaItemUrl
          }
          title
        }
        fundResources {
          file {
            altText
            uri
            title(format: RAW)
            mediaItemUrl
          }
          title
        }
      }
      distributionsCopy {
        title
        download {
          url
          title
        }
        file {
          mediaItemUrl
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
    }
    title
    customerFooter {
      customFooter
    }
  }
}
`);
