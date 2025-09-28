/**
 * Welcome Screen (Index)
 *
 * This is the entry point of the Aegis SDK example application.
 * It provides a simple welcome interface that guides users to the wallet connection flow.
 *
 * Features:
 * - Clean, modern welcome interface
 * - Navigation to wallet connection options
 * - Branded with Cavos logo
 * - Dark theme consistent with the app
 */

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  /**
   * Handle Connect Button Press
   *
   * This function is called when the user taps the "Connect" button.
   * It navigates to the account screen where users can choose their
   * preferred wallet connection method.
   *
   * Available connection options on the account screen:
   * - Create In-App Wallet (deploy new Starknet wallet)
   * - Email & Password authentication
   * - Apple Sign-In (OAuth)
   * - Google Sign-In (OAuth)
   */
  const handleConnect = () => {
    // Navigate to account screen where wallet connection options are available
    router.push("/account");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Cavos logo - represents the Aegis SDK brand */}
        <Image
          source={require("../assets/images/cavos-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Main call-to-action button */}
        <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>

        {/* Footer text */}
        <Text style={styles.footer}>Aegis sdk example</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 60,
  },
  connectButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    color: "#FFFFFF",
    fontSize: 14,
    position: "absolute",
    bottom: 50,
  },
});
