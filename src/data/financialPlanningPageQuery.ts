import gql from "graphql-tag";

export const financialPlanningPageQuery = gql(`
query financialPlanningPageQuery {
  page(id: "174", idType: DATABASE_ID) {
    financialPlanning {
      introduction
      collaboration {
        title
        description
      }
    }
  }
}
`);
