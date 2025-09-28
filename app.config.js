// Expo App Configuration
// This file handles environment variables and app configuration

import "dotenv/config";

export default {
  expo: {
    name: "Aegis SDK Example",
    slug: "aegis-sdk-example",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/cavos-icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/images/cavos-icon.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/cavos-icon.png",
        backgroundColor: "#000000",
      },
    },
    web: {
      favicon: "./assets/images/cavos-icon.png",
    },
    extra: {
      // Aegis SDK Configuration
      aegisAppId: process.env.AEGIS_APP_ID,
      aegisApiSecret: process.env.AEGIS_API_SECRET,
      aegisAppName: process.env.AEGIS_APP_NAME || "Aegis SDK Example",
      aegisNetwork: process.env.AEGIS_NETWORK || "SN_SEPOLIA",
      aegisEnableLogging: process.env.AEGIS_ENABLE_LOGGING || "true",
      aegisPaymasterApiKey: process.env.AEGIS_PAYMASTER_API_KEY,
      aegisTrackingApiUrl: process.env.AEGIS_TRACKING_API_URL,
    },
  },
};
