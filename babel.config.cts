import type { ConfigFunction } from "@babel/core";

const { babelOptimizerPlugin } = require("@graphql-codegen/client-preset");

const config: ConfigFunction = (api) => {
  api.cache.forever();
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin",
      [
        babelOptimizerPlugin,
        { artifactDirectory: "./graphql", gqlTagName: "gql" },
      ],
    ],
  };
};

module.exports = config;
