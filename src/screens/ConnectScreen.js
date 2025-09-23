import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";

export default function ConnectScreen({ navigation }) {
  const handleConnect = () => {
    // Navigate to address screen with mock wallet address
    navigation.navigate("Address", {
      address:
        "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    });
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

        {/* Connect Button */}
        <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
          <Text style={styles.connectButtonText}>Connect</Text>
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
  connectButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
    alignItems: "center",
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
