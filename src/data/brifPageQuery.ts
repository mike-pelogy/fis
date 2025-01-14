import gql from "graphql-tag";

export const brifPageQuery = gql(`
query BRIFPageQuery {
  page(idType: DATABASE_ID, id: "2547") {
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
