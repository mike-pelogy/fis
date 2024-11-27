import gql from "graphql-tag";

export const homePageQuery = gql(`
query Homepage {
page(idType: DATABASE_ID, id: "2") {
homepage {
      aboutSection {
        callToAction {
          url
          title
          target
        }
        title
        description
      }
      landing {
        title
        description
        callToAction {
          target
          title
          url
        }
      }
      services {
        title
        investment {
          title
          fieldGroupName
          description
          callToAction {
            url
            title
            target
          }
        }
        wealthManagement {
          title
          services {
            title
            description
          }
          description
          callToAction {
            url
            title
            target
          }
        }
      }
      latestNewAndInsights {
        link {
          title
          url
        }
        title
      }
      contactUsCtaSimple {
        description
        link {
          title
          url
        }
        title
      }
    }
  }
}
`);
