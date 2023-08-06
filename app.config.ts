import { ConfigContext } from '@expo/config';
import env from 'env-var';
require('dotenv').config();

export const API_URL = env.get('EXPO_PUBLIC_API_URL').required().asString();
export const API_KEY = env.get('EXPO_PUBLIC_API_KEY').required().asString();
export const GOOGLE_MAPS_API_KEY = env.get('EXPO_PUBLIC_GOOGLE_MAPS_API_KEY').required().asString();

export default ({ config }: ConfigContext) => {
  config = {
    ...config,
    extra: {
      apiUrl: API_URL,
      apiKey: API_KEY,
      ...config.extra,
    },
    android: {
      config: {
        googleMaps: {
          apiKey: GOOGLE_MAPS_API_KEY,
        },
        ...config.android?.config,
      },
      ...config.android,
    },
  };
  return config;
};
