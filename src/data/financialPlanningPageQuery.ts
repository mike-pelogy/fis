import gql from "graphql-tag";

export const financialPlanningPageQuery = gql(`
query financialPlanningPageQuery {
  page(id: "2843", idType: DATABASE_ID) {
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
