import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import ConnectScreen from "./src/screens/ConnectScreen";
import AddressScreen from "./src/screens/AddressScreen";
import AccountScreen from "./src/screens/AccountScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Connect"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Connect"
          component={ConnectScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
