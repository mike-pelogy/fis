import gql from "graphql-tag";

export const teamMemberQuery = gql(`
query teamMember($slug: String!) {
  teamBy(slug: $slug) {
    content
    title
    slug
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    teamMember {
      phone
      email
      titles {
        title
      }
    }
  }
}
`);

export const teamsQuery = gql(`
query teams {
  teams(first: 99) {
    edges {
      node {
        slug
      }
    }
  }
}
`);
