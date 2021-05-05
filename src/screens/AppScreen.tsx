import React, { useState } from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import ImageCapture from "../components/ImageCapture";
import ResultsModal from "../components/ResultsModal";
import PredictButton from "../components/PredictButton";

const { height } = Dimensions.get("window");

const AppScreen = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <ImageCapture />
      <PredictButton onPress={showModal} />

      <ResultsModal visible={visible} hideModal={hideModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
    height,
  },
  logo: {
    height: 150,
    width: 150,
  },
});

export default AppScreen;
