import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AegisProvider } from "@cavos/aegis";
import { AEGIS_CONFIG } from "../config";

export default function RootLayout() {
  return (
    <AegisProvider
      config={{
        network: AEGIS_CONFIG.network,
        appName: AEGIS_CONFIG.appName,
        appId: AEGIS_CONFIG.appId,
        enableLogging: AEGIS_CONFIG.enableLogging,
        paymasterApiKey: AEGIS_CONFIG.paymasterApiKey,
        trackingApiUrl: AEGIS_CONFIG.trackingApiUrl,
      }}
    >
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000000" },
        }}
      />
    </AegisProvider>
  );
}
