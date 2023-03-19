import { ConfigContext } from "@expo/config";

// enum BundleIds {
//   "PROD" = "hu.kirdev.indulasch",
//   "STAGING" = "hu.kirdev.indulasch.staging",
//   "DEV" = "hu.kirdev.indulasch.dev",
// }

// function getEnvironment<T>(prod: T, staging: T, dev: T): T {
//   switch (process.env.ENVIRONMENT) {
//     case "production":
//       return prod;
//     case "staging":
//       return staging;
//     default:
//       return dev;
//   }
// }

require("dotenv").config();

export default ({ config }: ConfigContext) => {
  config = {
    ...config,
    extra: {
      apiUrl: process.env.API_URL,
      eas: {
        projectId: "635e5b7f-3bd0-476c-865f-2a8f04393712",
      },
    },
  };
  return config;
};
