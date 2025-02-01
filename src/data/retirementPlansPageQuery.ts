import gql from "graphql-tag";

export const retirementPlansPageQuery = gql(`query retirementPlansPageQuery {
  page(id: "2839", idType: DATABASE_ID) {
    retirementPlans {
      introduction {
        intro
        intro2
        quote
      }
      servicesBenefits {
        description
        servicesAndBenefits {
          title
          description
        }
        title
        image {
          altText
          mediaItemUrl
        }
      }
    }
  }
}`);
