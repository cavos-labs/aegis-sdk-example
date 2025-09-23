import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import * as Clipboard from "expo-clipboard";

export default function AddressScreen({ navigation, route }) {
  const { address } = route.params || {};
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await Clipboard.setStringAsync(address);
      setCopied(true);
      Alert.alert("Copied", "Wallet address copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      Alert.alert("Error", "Failed to copy address");
    }
  };

  const handleGoToAccount = () => {
    navigation.navigate("Account");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const formatAddress = (addr) => {
    if (!addr) return "0x0...000";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 3)}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Top Text */}
        <Text style={styles.topText}>AEGIS-SDK</Text>

        {/* Cavos Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/cavos-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <Text style={styles.addressLabel}>Your address:</Text>

          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{formatAddress(address)}</Text>
            <TouchableOpacity
              style={[styles.copyButton, copied && styles.copyButtonCopied]}
              onPress={handleCopyAddress}
            >
              <Text style={styles.copyIcon}>⧉</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Go to Account Button */}
        <TouchableOpacity
          style={styles.accountButton}
          onPress={handleGoToAccount}
        >
          <Text style={styles.accountButtonText}>Go to account</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
  },
  topText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
  },
  addressSection: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  addressLabel: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 15,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#333",
  },
  addressText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
  },
  copyButton: {
    padding: 5,
  },
  copyButtonCopied: {
    backgroundColor: "#007AFF",
    borderRadius: 15,
  },
  copyIcon: {
    color: "#fff",
    fontSize: 16,
  },
  accountButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
    alignItems: "center",
  },
  accountButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
