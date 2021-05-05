import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const fruitIcons = [
  "fruit-cherries",
  "fruit-pineapple",
  "food-apple",
  "fruit-grapes",
];

const PredictButton = ({ onPress }: any) => {
  const [fruitName, setFruitName] = useState<string>("fruit-cherries");

  useEffect(() => {
    setInterval(
      () =>
        setFruitName(fruitIcons[Math.floor(Math.random() * fruitIcons.length)]),
      3000
    );
  }, []);
  return (
    <Button
      icon={fruitName}
      mode="contained"
      labelStyle={styles.btnText}
      contentStyle={styles.content}
      //loading={true}
      onPress={onPress}
    >
      Predict Fruit
    </Button>
  );
};

const styles = StyleSheet.create({
  btnText: { color: "white" },
  content: {
    padding: 15,
    flexDirection: "row-reverse",
  },
});

export default PredictButton;
