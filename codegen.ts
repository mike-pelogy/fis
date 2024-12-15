import { API, AUTH } from "./src/constants";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [API]: {
        headers: {
          Authorization: AUTH,
        },
      },
    },
  ],
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
