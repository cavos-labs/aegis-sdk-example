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

export default function AccountScreen({ navigation }) {
  const [strkBalance, setStrkBalance] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);

  const handleGetStrkBalance = async () => {
    try {
      // Mock API call - replace with actual Aegis SDK call
      const balance = (Math.random() * 1000).toFixed(4);
      setStrkBalance(balance);
      Alert.alert("$STRK Balance", `${balance} STRK`);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch STRK balance");
    }
  };

  const handleGetEthBalance = async () => {
    try {
      // Mock API call - replace with actual Aegis SDK call
      const balance = (Math.random() * 10).toFixed(4);
      setEthBalance(balance);
      Alert.alert("$ETH Balance", `${balance} ETH`);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch ETH balance");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
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

        {/* Balance Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.balanceButton}
            onPress={handleGetStrkBalance}
          >
            <Text style={styles.balanceButtonText}>Get $STRK balance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.balanceButton}
            onPress={handleGetEthBalance}
          >
            <Text style={styles.balanceButtonText}>Get $ETH balance</Text>
          </TouchableOpacity>
        </View>

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
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  balanceButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 250,
    alignItems: "center",
  },
  balanceButtonText: {
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
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
