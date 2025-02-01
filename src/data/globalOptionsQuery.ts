import gql from "graphql-tag";

export const globalOptionsQuery = gql(`
query globalOptions {
  themeGeneralSettings {
    globalOptions {
      phoneNumber
      footerDisclosure
      advUrl
      subscribe {
        title
        description
      }
      socials {
        url
        type
      }
    }
  }
}
`);
