import * as env from 'env-var';
console.log(process.env);
export const API_URL = env.get('EXPO_PUBLIC_API_URL').required().asString();
export const API_KEY = env.get('EXPO_PUBLIC_API_KEY').required().asString();
