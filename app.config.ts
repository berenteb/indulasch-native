import { ConfigContext } from "@expo/config";

enum BundleIds {
  "PROD" = "hu.kir-dev.indulasch",
  "STAGING" = "hu.kir-dev.indulasch.staging",
  "DEV" = "hu.kir-dev.indulasch.dev",
}

function getEnvironment<T>(prod: T, staging: T, dev: T): T {
  switch (process.env.ENVIRONMENT) {
    case "production":
      return prod;
    case "staging":
      return staging;
    default:
      return dev;
  }
}

require("dotenv").config({
  path: getEnvironment(
    "./.env.production",
    "./.env.staging",
    "./.env.development"
  ),
});

export default ({ config }: ConfigContext) => {
  const bundleId = getEnvironment(
    BundleIds.PROD,
    BundleIds.STAGING,
    BundleIds.DEV
  );

  config = {
    ...config,
    name: config.name + getEnvironment("", " Staging", " Dev"),
    extra: {
      apiUrl: process.env.API_URL,
      eas: {
        projectId: "635e5b7f-3bd0-476c-865f-2a8f04393712",
      },
    },
  };
  if (config.ios?.bundleIdentifier) config.ios.bundleIdentifier = bundleId;
  if (config.android?.package) config.android.package = bundleId;
  return config;
};
