import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import ImageCapture from "../components/ImageCapture";
import ResultsModal from "../components/ResultsModal";

const { height } = Dimensions.get("window");

const AppScreen = () => {
  const [result, setResult] = useState(null);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const updateResult = (value: any) => setResult(value);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <ImageCapture
        updateResult={updateResult}
        showModal={showModal}
        modalVisible={visible}
      />
      <ResultsModal visible={visible} hideModal={hideModal} result={result} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    height,
  },
  logo: {
    height: 150,
    width: 150,
  },
});

export default AppScreen;
