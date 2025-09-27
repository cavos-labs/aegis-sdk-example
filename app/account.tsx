import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAegis } from "@cavos/aegis";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import * as Clipboard from "expo-clipboard";

export default function Account() {
  const router = useRouter();
  const { aegisAccount, isConnected, currentAddress, disconnect } = useAegis();
  const [isDeploying, setIsDeploying] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Load existing wallet on component mount
  useEffect(() => {
    loadExistingWallet();
  }, []);

  const loadExistingWallet = async () => {
    try {
      const savedPrivateKey = await SecureStore.getItemAsync(
        "wallet_private_key"
      );
      if (savedPrivateKey && aegisAccount) {
        await aegisAccount.connectAccount(savedPrivateKey);
        setWalletAddress(aegisAccount.address);
      }
    } catch (error) {
      console.log("No existing wallet found or error loading:", error);
    }
  };

  const handleDeployWallet = async () => {
    if (!aegisAccount) {
      Alert.alert("Error", "Aegis SDK not initialized");
      return;
    }

    setIsDeploying(true);
    try {
      // Deploy new wallet
      const privateKey = await aegisAccount.deployAccount();

      // Save private key securely
      await SecureStore.setItemAsync("wallet_private_key", privateKey);

      // Update UI with new address
      setWalletAddress(aegisAccount.address);

      Alert.alert(
        "Wallet Created!",
        `Your wallet has been deployed successfully.\n\nAddress: ${aegisAccount.address}\n\nPrivate Key: ${privateKey}\n\n⚠️ IMPORTANT: Save your private key securely!`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Wallet deployment failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      Alert.alert("Error", `Failed to deploy wallet: ${errorMessage}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleGoToAccount = () => {
    // Navigate to balance screen
    router.push("/balance");
  };

  const handleCopyAddress = async () => {
    if (walletAddress) {
      try {
        await Clipboard.setStringAsync(walletAddress);
        console.log("Copy address to clipboard:", walletAddress);
        Alert.alert("Copied", "Address copied to clipboard");
      } catch (error) {
        console.error("Failed to copy address:", error);
        Alert.alert("Error", "Failed to copy address");
      }
    }
  };

  const handleGoBack = () => {
    // Navigate back to connect screen
    router.back();
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout? This will clear your wallet data and you will need to create a new wallet.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              // Clear secure storage
              await SecureStore.deleteItemAsync("wallet_private_key");

              // Disconnect from Aegis
              disconnect();

              // Reset local state
              setWalletAddress(null);

              // Navigate back to home screen
              router.push("/");

              Alert.alert("Success", "Logged out successfully");
            } catch (error) {
              console.error("Logout failed:", error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image
          source={require("../assets/images/cavos-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {walletAddress ? (
          <>
            <Text style={styles.addressLabel}>Your wallet address:</Text>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </Text>
              <TouchableOpacity
                onPress={handleCopyAddress}
                style={styles.copyButton}
              >
                <Text style={styles.copyIcon}>⧉</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.accountButton}
              onPress={handleGoToAccount}
            >
              <Text style={styles.buttonText}>View Balance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.welcomeText}>Create Your Wallet</Text>
            <Text style={styles.descriptionText}>
              Deploy a new Starknet wallet with gasless deployment
            </Text>
            <TouchableOpacity
              style={[
                styles.deployButton,
                isDeploying && styles.disabledButton,
              ]}
              onPress={handleDeployWallet}
              disabled={isDeploying}
            >
              {isDeploying ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                  <Text style={styles.buttonText}>Deploying...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Deploy Wallet</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.footer}>Aegis SDK Example</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
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
    marginBottom: 40,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  descriptionText: {
    color: "#CCCCCC",
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  addressLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  addressText: {
    color: "#007AFF",
    fontSize: 16,
    marginRight: 10,
  },
  copyButton: {
    padding: 5,
  },
  copyIcon: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  deployButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 40,
    minWidth: 200,
  },
  disabledButton: {
    backgroundColor: "#666666",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 40,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginLeft: 8,
  },
  footer: {
    color: "#FFFFFF",
    fontSize: 14,
    position: "absolute",
    bottom: 50,
  },
});
