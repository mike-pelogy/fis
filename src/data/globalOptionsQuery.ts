import gql from "graphql-tag";

export const globalOptionsQuery = gql(`
query globalOptions {
  themeGeneralSettings {
    globalOptions {
      subscribe {
        title
        description
        image {
          altText
          mediaItemUrl
        }
      }
    }
  }
}
`);
