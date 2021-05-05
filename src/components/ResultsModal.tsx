import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";

const ResultsModal = ({ visible, hideModal }: any) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.container}
      >
        <Text>It's a banana!</Text>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 50,
    height: "50%",
    borderRadius: 15,
    alignItems: "center",
  },
});

export default ResultsModal;
