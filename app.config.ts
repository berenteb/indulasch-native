import { ConfigContext } from '@expo/config';
import env from 'env-var';
require('dotenv').config();

const API_URL = env.get('API_URL').required().asString();

export default ({ config }: ConfigContext) => {
  config = {
    ...config,
    extra: {
      apiUrl: API_URL,
      eas: {
        projectId: '635e5b7f-3bd0-476c-865f-2a8f04393712',
      },
    },
    updates: {
      url: 'https://u.expo.dev/635e5b7f-3bd0-476c-865f-2a8f04393712',
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
  };
  return config;
};
