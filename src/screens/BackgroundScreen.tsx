import React, { useEffect, useRef } from "react";
import { StyleSheet, ScrollView, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const BackgroundScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => {
    const numOfBackground = 3;
    let scrollValue = 0,
      scrolled = 0;
    setInterval(function () {
      scrolled++;
      if (scrolled < numOfBackground) scrollValue = scrollValue + width;
      else {
        scrollValue = 0;
        scrolled = 0;
      }
      scrollRef.current?.scrollTo({ x: scrollValue });
    }, 3000);
  }, []);
  return (
    <ScrollView
      ref={scrollRef}
      style={styles.background}
      horizontal={true}
      pagingEnabled={true}
    >
      <Image source={require("../../assets/bg1.png")} style={styles.image} />
      <Image source={require("../../assets/bg2.png")} style={styles.image} />
      <Image source={require("../../assets/bg3.png")} style={styles.image} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
  },
  image: {
    height,
    width,
    opacity: 0.4,
  },
});

export default BackgroundScreen;
