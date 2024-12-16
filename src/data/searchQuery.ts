import gql from "graphql-tag";

export const searchTeams = gql(`
query searchPosts($search: String!) {
  teams(where: {search: $search}, first: 99) {
    edges {
      node {
        title
        slug
        uri
      }
    }
  }
}`);

export const searchPages = gql(`
query searchPosts($search: String!) {
  pages(where: {search: $search}, first: 99) {
    edges {
      node {
        title
        slug
        uri
      }
    }
  }
}`);

export const searchPosts = gql(`
query searchPosts($search: String!) {
  posts(where: {search: $search}, first: 99) {
    edges {
      node {
        title
        slug
        uri
      }
    }
  }
}`);
