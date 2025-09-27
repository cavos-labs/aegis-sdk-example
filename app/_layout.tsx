import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AegisProvider } from "@cavos/aegis";

export default function RootLayout() {
  return (
    <AegisProvider
      config={{
        network: 'SN_SEPOLIA',
        appName: 'Aegis SDK Example',
        appId: 'example-app-id', // You'll need to get a real app ID from https://aegis.cavos.xyz
        enableLogging: true
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
