# InduláSch Native

![supports iOS](https://img.shields.io/badge/iOS-999999.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff)
![supports Android](https://img.shields.io/badge/Android-A4C639.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff)

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](exp://exp.host/@berenteb/indulasch?release-channel=default)

Mobile application for iOS and Android based on React Native & Expo.

![Screenshot](https://warp.sch.bme.hu/images/1290x2796bb)

## Development

1. Create a `.env` file with an `API_URL=<backend url>` field to have the application working.
2. Install dependencies with `yarn install`
3. Run with `yarn ios` or `yarn android`

## Release

Release is done automatically using GitHub Actions and EAS using EAS Update. In this case it is supposed that you did not change any native code or config (you updated something in the Update layer).

If native code (native layer) or config is changed (i.e. app.json, app.config.ts, etc.) a new build and submit to app stores are needed.

Run `yarn build:ios` and `yarn build:android` to tell EAS to build new binaries. This will take some time. On success, create a new AppStore and Play Store submission using `yarn submit:ios` and `yarn submit:android`.
