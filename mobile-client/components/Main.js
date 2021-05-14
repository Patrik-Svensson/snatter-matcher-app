import React from "react";
import { View } from "react-native";
import Navbar from "./Navbar";

function Main() {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end",
      }}
    >
      <Navbar />
    </View>
  );
}

export default Main;
