import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet,Platform } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import AppScreen from "./src/screens/AppScreen";
import BackgroundScreen from "./src/screens/BackgroundScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ff5a5a",
    accent: "yellow",
  },
};

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <PaperProvider theme={theme}>
          <AppScreen />
        </PaperProvider>
      </SafeAreaView>
      {Platform.OS!=="android"&&<BackgroundScreen />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    elevation: 100,
  },
});
