/**
 * Aegis SDK Configuration
 *
 * This file contains the configuration settings for the Aegis SDK integration.
 * It loads sensitive configuration from environment variables for security,
 * with fallback values for development purposes.
 *
 * IMPORTANT: Never commit sensitive values like API secrets to public repositories.
 * Use environment variables or secure configuration management in production.
 */

import Constants from "expo-constants";

export const AEGIS_CONFIG = {
  /**
   * App ID - Required for Aegis SDK authentication
   *
   * This is your unique application identifier obtained from https://aegis.cavos.xyz
   * Each app needs its own App ID to interact with the Aegis platform.
   *
   * Priority: Environment variable > Fallback value
   */
  appId:
    Constants.expoConfig?.extra?.aegisAppId ||
    "app-6fd6d3c95e7a16fc717c5895d3b76ee0",

  /**
   * API Secret - Required for server-side operations
   *
   * This secret key is used for authenticating API requests to the Aegis platform.
   * Keep this value secure and never expose it in client-side code or public repositories.
   *
   * Priority: Environment variable > Fallback value
   */
  apiSecret:
    Constants.expoConfig?.extra?.aegisApiSecret ||
    "41c2cdac674030a62122f7e5dffd5d68e6b07053a48263b8cc87286ceefbecf1",

  /**
   * Application Configuration
   */

  // Display name for your application (shown in wallet connections)
  appName: Constants.expoConfig?.extra?.aegisAppName || "Aegis SDK Example",

  // Starknet network to connect to
  // Options: 'SN_SEPOLIA' (testnet) or 'SN_MAINNET' (mainnet)
  network:
    (Constants.expoConfig?.extra?.aegisNetwork as
      | "SN_SEPOLIA"
      | "SN_MAINNET") || "SN_SEPOLIA",

  /**
   * Optional Configuration
   */

  // Enable debug logging for development
  // Set to false in production to reduce console output
  enableLogging:
    Constants.expoConfig?.extra?.aegisEnableLogging === "true" || true,

  /**
   * AVNU Paymaster API Key - For gasless transactions
   *
   * This optional key enables gasless transactions using AVNU's paymaster service.
   * Get your API key from https://avnu.fi/
   *
   * When provided, users won't need ETH to pay for transaction fees.
   * This is especially useful for onboarding new users to Starknet.
   */
  paymasterApiKey:
    Constants.expoConfig?.extra?.aegisPaymasterApiKey || undefined,

  /**
   * Custom Tracking API URL - For analytics and monitoring
   *
   * Optional URL for sending analytics data about wallet operations.
   * Useful for monitoring user behavior and transaction success rates.
   */
  trackingApiUrl: Constants.expoConfig?.extra?.aegisTrackingApiUrl || undefined,
};

/**
 * Security Best Practices:
 *
 * 1. Environment Variables: Always use environment variables for sensitive data
 * 2. Never Commit Secrets: Never commit API secrets or private keys to version control
 * 3. Use app.config.js: Configure environment variables in app.config.js
 * 4. Production Security: Consider using a secrets management service in production
 * 5. Regular Rotation: Regularly rotate API keys and secrets
 * 6. Access Control: Limit access to configuration files to authorized developers only
 *
 * Example app.config.js configuration:
 * ```javascript
 * export default {
 *   extra: {
 *     aegisAppId: process.env.AEGIS_APP_ID,
 *     aegisApiSecret: process.env.AEGIS_API_SECRET,
 *     aegisAppName: process.env.AEGIS_APP_NAME,
 *     aegisNetwork: process.env.AEGIS_NETWORK,
 *     aegisEnableLogging: process.env.AEGIS_ENABLE_LOGGING,
 *     aegisPaymasterApiKey: process.env.AEGIS_PAYMASTER_API_KEY,
 *     aegisTrackingApiUrl: process.env.AEGIS_TRACKING_API_URL,
 *   }
 * };
 * ```
 */
