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
import { useState } from "react";

export default function Balance() {
  const router = useRouter();
  const { disconnect, aegisAccount, currentAddress } = useAegis();

  // State for balance data and loading
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [nfts, setNfts] = useState<any[] | null>(null);
  const [isLoadingEth, setIsLoadingEth] = useState(false);
  const [isLoadingToken, setIsLoadingToken] = useState(false);
  const [isLoadingNfts, setIsLoadingNfts] = useState(false);

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

  const handleGetNFTs = async () => {
    if (!aegisAccount || !currentAddress) {
      Alert.alert("Error", "Aegis SDK not initialized or no address available");
      return;
    }

    setIsLoadingNfts(true);
    try {
      const nftData = await aegisAccount.getNFTs(currentAddress);
      setNfts(nftData);
      console.log("NFTs:", nftData);
      Alert.alert("NFTs", `Found ${nftData.length} NFTs`);
    } catch (error) {
      console.error("Failed to get NFTs:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      Alert.alert("Error", `Failed to get NFTs: ${errorMessage}`);
    } finally {
      setIsLoadingNfts(false);
    }
  };

  const handleGoBack = () => {
    // Navigate back to account screen
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
            <Text style={styles.addressText}>
              {currentAddress.slice(0, 6)}...{currentAddress.slice(-4)}
            </Text>
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

        <TouchableOpacity
          style={[styles.balanceButton, isLoadingNfts && styles.disabledButton]}
          onPress={handleGetNFTs}
          disabled={isLoadingNfts}
        >
          {isLoadingNfts ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text style={styles.buttonText}>Loading...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Get NFTs</Text>
          )}
        </TouchableOpacity>

        {nfts && (
          <View style={styles.balanceResult}>
            <Text style={styles.balanceLabel}>NFTs Found:</Text>
            <Text style={styles.balanceValue}>{nfts.length} NFTs</Text>
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

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
    paddingBottom: 100,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  addressContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  addressLabel: {
    color: "#CCCCCC",
    fontSize: 14,
    marginBottom: 5,
  },
  addressText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  balanceButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
    maxWidth: 300,
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
    marginBottom: 20,
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
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
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
    maxWidth: 300,
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
  },
  footer: {
    color: "#FFFFFF",
    fontSize: 14,
    position: "absolute",
    bottom: 50,
  },
});
