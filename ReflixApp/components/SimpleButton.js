import * as React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

export default function SimpleButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  button: {
    width: (deviceWidth * 40) / 100,
    height: (deviceHeight * 5) / 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 2,
  },
  buttonText: {
    color: "#3090FF",
    fontSize: 18,
  },
});
