import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAegis } from "@cavos/aegis";
import * as SecureStore from "expo-secure-store";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";

export default function Balance() {
  const router = useRouter();
  const { aegisAccount, currentAddress } = useAegis();

  // State for balance data and loading
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [isLoadingEth, setIsLoadingEth] = useState(false);
  const [isLoadingToken, setIsLoadingToken] = useState(false);

  const handleGetSTRKBalance = async () => {
    if (!aegisAccount) {
      Alert.alert("Error", "Aegis SDK not initialized");
      return;
    }

    setIsLoadingToken(true);
    try {
      // Get STRK token balance (STRK token address on Sepolia)
      const strkTokenAddress =
        "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";
      const balance = await aegisAccount.getTokenBalance(strkTokenAddress, 18);
      setTokenBalance(balance);
      console.log("STRK balance:", balance);
      Alert.alert("STRK Balance", `Balance: ${balance} STRK`);
    } catch (error) {
      console.error("Failed to get STRK balance:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      Alert.alert("Error", `Failed to get STRK balance: ${errorMessage}`);
    } finally {
      setIsLoadingToken(false);
    }
  };

  const handleGetETHBalance = async () => {
    if (!aegisAccount) {
      Alert.alert("Error", "Aegis SDK not initialized");
      return;
    }

    setIsLoadingEth(true);
    try {
      const balance = await aegisAccount.getETHBalance();
      setEthBalance(balance);
      console.log("ETH balance:", balance);
      Alert.alert("ETH Balance", `Balance: ${balance} ETH`);
    } catch (error) {
      console.error("Failed to get ETH balance:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      Alert.alert("Error", `Failed to get ETH balance: ${errorMessage}`);
    } finally {
      setIsLoadingEth(false);
    }
  };

  const handleGoBack = () => {
    // Navigate back to account screen
    router.back();
  };

  const handleCopyAddress = async () => {
    if (currentAddress) {
      try {
        await Clipboard.setStringAsync(currentAddress);
        console.log("Copy address to clipboard:", currentAddress);
        Alert.alert("Copied", "Address copied to clipboard");
      } catch (error) {
        console.error("Failed to copy address:", error);
        Alert.alert("Error", "Failed to copy address");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Image
          source={require("../assets/images/cavos-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {currentAddress && (
          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>Wallet Address:</Text>
            <View style={styles.addressRow}>
              <Text style={styles.addressText}>
                {currentAddress.slice(0, 6)}...{currentAddress.slice(-4)}
              </Text>
              <TouchableOpacity
                onPress={handleCopyAddress}
                style={styles.copyButton}
              >
                <Text style={styles.copyIcon}>⧉</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.balanceButton, isLoadingEth && styles.disabledButton]}
          onPress={handleGetETHBalance}
          disabled={isLoadingEth}
        >
          {isLoadingEth ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text style={styles.buttonText}>Loading...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Get $ETH balance</Text>
          )}
        </TouchableOpacity>

        {ethBalance && (
          <View style={styles.balanceResult}>
            <Text style={styles.balanceLabel}>ETH Balance:</Text>
            <Text style={styles.balanceValue}>{ethBalance} ETH</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.balanceButton,
            isLoadingToken && styles.disabledButton,
          ]}
          onPress={handleGetSTRKBalance}
          disabled={isLoadingToken}
        >
          {isLoadingToken ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text style={styles.buttonText}>Loading...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Get $STRK balance</Text>
          )}
        </TouchableOpacity>

        {tokenBalance && (
          <View style={styles.balanceResult}>
            <Text style={styles.balanceLabel}>STRK Balance:</Text>
            <Text style={styles.balanceValue}>{tokenBalance} STRK</Text>
          </View>
        )}

        <Text style={styles.footer}>Aegis sdk example</Text>
      </ScrollView>
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
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 80,
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
  },
  addressContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  addressLabel: {
    color: "#CCCCCC",
    fontSize: 14,
    marginBottom: 5,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
  },
  copyButton: {
    padding: 5,
  },
  copyIcon: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  balanceButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 30,
    width: "100%",
    maxWidth: 280,
    alignSelf: "center",
  },
  disabledButton: {
    backgroundColor: "#666666",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceResult: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 8,
    marginBottom: 30,
    width: "100%",
    maxWidth: 280,
    alignItems: "center",
    alignSelf: "center",
  },
  balanceLabel: {
    color: "#CCCCCC",
    fontSize: 14,
    marginBottom: 5,
  },
  balanceValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
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
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
  },
});
