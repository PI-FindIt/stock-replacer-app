import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost", // This runs on server, which has access to API
  documents: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  generates: {
    "./graphql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./graphql/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
  config: {
    withHooks: true,
    withComponent: false,
    futureProofEnums: true,
  },
  ignoreNoDocuments: true,
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
