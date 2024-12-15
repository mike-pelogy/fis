import gql from "graphql-tag";

export const prayPageQuery = gql(`
query PrayPage {
  page(idType: DATABASE_ID, id: "60") {
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
      distributions
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
  }
}
`);
