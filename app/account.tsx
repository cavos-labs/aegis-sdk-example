import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

export default function Account() {
  const router = useRouter();

  const handleGoToAccount = () => {
    // Navigate to balance screen
    router.push("/balance");
  };

  const handleCopyAddress = () => {
    // Copy address to clipboard functionality
    console.log("Copy address to clipboard");
  };

  const handleGoBack = () => {
    // Navigate back to connect screen
    router.back();
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

        <Text style={styles.addressLabel}>Your address:</Text>

        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>0x0...456</Text>
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
          <Text style={styles.buttonText}>Go to account</Text>
        </TouchableOpacity>

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
  accountButton: {
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
