import React from "react";
import { StyleSheet, Image, View, ImageSourcePropType } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import { fruitDatabase } from "./../services/fruitsDatabase";

const ResultsModal = ({ visible, hideModal, result }: any) => {
  const fruit = fruitDatabase.find((fruit) => fruit.name === result);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.container}
      >
        {result && result.a && (
          <Text style={styles.confidence}>{result.a}</Text>
        )}
        {fruit ? (
          <>
            <Text style={styles.title}>{fruit ? fruit.name : result}</Text>
            <View style={styles.wrapper}>
              <View style={styles.detailContainer}>
                <Text style={styles.detailTitle}>Taste</Text>
                <Text style={styles.details}>{fruit.taste}</Text>
              </View>
              <Image source={fruit.img} style={styles.image} />
            </View>
            <View>
              <Text style={styles.detailTitle}>Our advice</Text>
              <Text style={styles.details}>{fruit.advice}</Text>
            </View>
            <Text style={styles.price}>{`$${fruit.price.toFixed(2)}/kg`}</Text>
          </>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{result}</Text>
            <Image
              source={require("../../assets/notfound.png")}
              style={styles.imagenotfound}
            />

            {result !== "Error occured" && (
              <Text
                style={[
                  styles.price,
                  {
                    textAlign: "center",
                  },
                ]}
              >
                {result === "Sorry."
                  ? "We are not sure what fruit this is."
                  : "Sorry, we do not have any information on this fruit."}
              </Text>
            )}
          </View>
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: "60%",
    borderRadius: 15,
    justifyContent: "space-between",
    marginTop: "13%",
  },
  confidence: {
    position: "absolute",
  },
  detailContainer: {
    width: "50%",
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff5a5a",
    marginBottom: 10,
  },
  details: {
    fontStyle: "italic",
  },
  image: {
    height: 150,
    width: 150,
  },
  imagenotfound: {
    height: 250,
    width: 250,
    marginTop: 15,
  },
  price: {
    fontSize: 25,
    marginBottom: 25,
    color: "#ff5a5a",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 25,
    color: "#ff5a5a",
  },
  wrapper: {
    flexDirection: "row",
    marginVertical: 10,
  },
});

export default ResultsModal;
