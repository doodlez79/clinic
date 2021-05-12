import { version } from './package.json';

const parsedVersion = /^(\d+).(\d+).(\d+)$/.exec(version);

if (!parsedVersion) {
  throw new Error('Incorrect application version!');
}
const versionParts = parsedVersion.slice(1, 4);
const versionPadding = [ 4, 3, 2 ];

versionParts.forEach((version, index) => {
  const isVersionWithLeadingZeros = (version !== parseInt(version, 10).toString());
  const isVersionIncorrectLength = (version.length > versionPadding[index]);

  if (isVersionWithLeadingZeros || isVersionIncorrectLength) {
    throw new Error('Incorrect application version!');
  }
});

const versionCode = parseInt(versionParts.map((v, index) => v.padStart(versionPadding[index], '0')).join(''), 10);

export default {
  name: 'Clinica-City',
  owner: 'clinica-city',
  slug: 'mobile-app',
  privacy: 'unlisted',
  version,
  orientation: 'portrait',
  icon: './assets/app-icon.png',
  entryPoint: './src/index.tsx',
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
    image: './assets/app-splash.png',
  },
  updates: {
    enabled: false,
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: [
    'assets/**/*',
  ],
  locales: {
    ru: './locales/ru.json',
    en: './locales/en.json',
  },
  extra: {
    version: {
      name: version,
      buildNumber: versionCode,
    },
  },
  ios: {
    bundleIdentifier: 'ru.clinica-city.app',
    buildNumber: version,
    supportsTablet: false,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      LSApplicationQueriesSchemes: [ 'dgis', 'yandexmaps', 'yandexnavi', 'comgooglemaps' ],
    },
    googleServicesFile: './google-services/ios.plist',
    config: {
      usesNonExemptEncryption: false,
      googleMapsApiKey: 'AIzaSyC4t5CqkQn7NoJSBC_8E8DFnR2bibYo_sQ',
    },
  },
  android: {
    versionCode,
    package: 'ru.clinicacity.app',
    useNextNotificationsApi: true,
    googleServicesFile: './google-services/android.json',
    config: {
      googleMaps: {
        apiKey: 'AIzaSyDc2NWMdG9vudFwmR_c81PYulbOa9YC1Xw',
      },
    },
  },
};
