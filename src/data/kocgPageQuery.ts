import gql from "graphql-tag";

export const kocgPageQuery = gql(`
query KocgPage {
page(idType: DATABASE_ID, id: "63") {
  kocg {
      dataReference {
        daily {
          mediaItemUrl
        }
        monthly {
          mediaItemUrl
        }
        quarterly {
          mediaItemUrl
        }
        top10Holdings {
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
      }
      landing {
        title
        subtitle
        description
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
      }
      distributions
    }
    title
  }
}
`);
