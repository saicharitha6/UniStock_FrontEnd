<!-- Title -->

<p align="center">
  <a href="https://github.com/expo/examples">
    <img alt="create-react-native-app" src="./.gh-assets/banner.svg">
    <h1 align="center">Create React Native App</h1>
  </a>
</p>

<!-- Header -->

<p align="center">
  <b>The fastest way to create React Native apps with expo</b>
  <br />

  <p align="center">
    <!-- iOS -->
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-000.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
    <!-- Android -->
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-000.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
    <!-- Web -->
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-000.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </p>
  <p align="center">
    <a href="https://packagephobia.now.sh/result?p=create-react-native-app">
      <img alt="the best way to bootstrap a react native app" longdesc="the best way to create a react native app" src="https://flat.badgen.net/packagephobia/install/create-react-native-app" />
    </a>
  </p>
  
</p>

<!-- Body -->

```sh
npx create-expo-app
```

Once you're up and running with Create React Native App, visit [the tutorial on reactnative.dev](https://reactnative.dev/docs/tutorial) and [the tutorial on expo.dev](https://docs.expo.dev/tutorial/introduction/) for more information on building mobile apps with React.

<p align="center">
  <img align="center" alt="Product: demo" src="./.gh-assets/crna.gif" />
</p>

## Installation steps

- `npm install -g expo-cli` install expo cli in globaly
- `yarn` insatll the dependencies

## Set environment variables

- `cp .env.example .env `
- update the EXPO_PUBLIC_API_URL with your ngrok url

## Usage

- `npx create-expo-app` Create a new native React app.
- `yarn run ios` -- (`npx expo run:ios`) Build the iOS App (requires a MacOS computer).
- `yarn run android` -- (`npx expo run:android`) Build the Android App.
- `yarn run web` -- (`npx expo start --web`) Run the website in your browser.

### Templates

By default you create a [bare workflow React](https://docs.expo.dev/bare/overview/) project with support for iOS, Android, and web. The project comes preconfigured with support for [Expo Modules](https://docs.expo.dev/modules/overview/), an API writing native modules using Swift and Kotlin, and this also makes it possible to use any library in the [Expo SDK](https://docs.expo.dev/versions/latest/).

You can opt to use an example project instead by selecting the "Templates from ..." option. Custom templates can be used with `--template <Example Name or GitHub URL>` option.

- Use an [example](https://github.com/expo/examples): `npx create-react-native-app -t with-typescript`
- Use a custom template: `npx create-react-native-app --template https://github.com/someone/my-react-starter` -- Only works with GitHub repos on the master branch.
- All examples can be modified in the [expo/examples](https://github.com/expo/examples) repo.

## Sections

- [Usage with Expo Go App](#usage-with-expo-go-app)
- [Support and Contact](#support-and-contact)
- [FAQs](#faqs)
- [Contributing](#contributing)

## Usage with Expo Go App

Expo Go enables you to work with all of the [Components and APIs](https://facebook.github.io/react-native/docs/getting-started) in `react-native`, as well as the [JavaScript APIs](https://docs.expo.io/versions/latest) that the are bundled with the Expo app.

- Download the "Expo Go" app from the Play Store or App Store.
- Start your project with Expo CLI: `npm start`
- Open the project by scanning the QR code in the terminal.

## Support and Contact

If you're having issues with Create React Native App, please make sure:

- The issue is not covered in the [Expo Docs](https://docs.expo.io/versions/latest/)
- There is not already an [open issue](https://github.com/expo/create-react-native-app/issues/) for your particular problem

If you've checked the documentation and currently open issues, please either [open a new GitHub issue](https://github.com/expo/create-react-native-app/issues/new) or ask a question on [Expo Community Discord](https://chat.expo.dev).

## Contributing

Refer to the [Contributing guide](https://github.com/expo/create-react-native-app/blob/main/CONTRIBUTING.md) for more information.

### Attribution

The examples feature was inspired by the `templates` system of [create-next-app](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) by the [Vercel](https://vercel.com/) team.

## Related

CRNA is focused on being the fastest way to bootstrap a React Native app without worrying about the native platforms or bundlers required for developing and shipping apps. Other tools provide both an init script (which is slower) and a suite of other tools that can be used for interacting with the project. CRNA is meant to be used with any of the following tools:

- [Expo CLI](https://docs.expo.dev/more/expo-cli/) by [Expo team](https://expo.dev)
- [Ignite CLI](https://github.com/infinitered/ignite) by [Infinite Red](https://infinite.red/)
- [React Native Community CLI](https://github.com/react-native-community/cli) by members of [the React Native community](https://github.com/orgs/react-native-community/people)

<!-- Footer -->
