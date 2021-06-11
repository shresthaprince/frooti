import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { Camera } from "expo-camera";
import PredictButton from "./PredictButton";
import predictFruit from "./../services/predictFruit";
import * as ImageManipulator from "expo-image-manipulator";

const ImageCapture = ({ updateResult, showModal, modalVisible }: any) => {
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<any>(null);
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [confidence, setConfidence] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (cameraRef) {
      let initialPhoto = await cameraRef.current.takePictureAsync();
      const photo = await ImageManipulator.manipulateAsync(
        initialPhoto.uri,
        [{ resize: { width: 100, height: 100 } }],
        { compress: 0 }
      );

      let localUri = photo.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      // let match = /\.(\w+)$/.exec(filename);
      // let type = match ? `image/${match[1]}` : `image`;
      const type = "image";

      let formData = new FormData();
      // @ts-ignore
      formData.append("file", { uri: localUri, name: filename, type });

      return formData;
    }
  };

  const handlePredictFruit = async () => {
    setLoading(true);
    const formData = await snap();
    let result;
    try {
      result = await predictFruit(formData);
      result.a && setConfidence(result.a);
      if (result["a"] < 75) updateResult("Sorry.");
      else updateResult(result["b"]);
    } catch (error) {
      updateResult("Error occured");
    }

    setLoading(false);
    showModal();
  };

  return (
    <>
      <View style={styles.container}>
        <Camera ref={cameraRef} style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              icon="camera"
              mode="text"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              Flip
            </Button>
          </View>
        </Camera>
      </View>
      <PredictButton onPress={handlePredictFruit} loading={loading} />
      {modalVisible && confidence && (
        <Text style={styles.confidence}>{`Confidence: ${confidence.toFixed(
          2
        )}%`}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    borderColor: "white",
    borderWidth: 1,
    marginVertical: 25,
  },
  camera: {
    flex: 1,
  },
  confidence: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});

export default ImageCapture;
