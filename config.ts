// Aegis SDK Configuration
// Loads configuration from environment variables for security

import Constants from 'expo-constants';

export const AEGIS_CONFIG = {
  // Your App ID from https://aegis.cavos.xyz
  appId: Constants.expoConfig?.extra?.aegisAppId || 'app-6fd6d3c95e7a16fc717c5895d3b76ee0',
  
  // Your API Secret (keep this secure!)
  apiSecret: Constants.expoConfig?.extra?.aegisApiSecret || '41c2cdac674030a62122f7e5dffd5d68e6b07053a48263b8cc87286ceefbecf1',
  
  // App Configuration
  appName: Constants.expoConfig?.extra?.aegisAppName || 'Aegis SDK Example',
  network: (Constants.expoConfig?.extra?.aegisNetwork as 'SN_SEPOLIA' | 'SN_MAINNET') || 'SN_SEPOLIA',
  
  // Optional: Enable debug logging
  enableLogging: Constants.expoConfig?.extra?.aegisEnableLogging === 'true' || true,
  
  // Optional: AVNU Paymaster API Key for gasless transactions
  // Get this from https://avnu.fi/
  paymasterApiKey: Constants.expoConfig?.extra?.aegisPaymasterApiKey || undefined,
  
  // Optional: Custom tracking URL
  trackingApiUrl: Constants.expoConfig?.extra?.aegisTrackingApiUrl || undefined,
};

// Security Note:
// - Environment variables are loaded from app.config.js
// - Never commit sensitive values to public repositories
// - Use app.config.js for configuration management
// - Consider using a secrets management service in production