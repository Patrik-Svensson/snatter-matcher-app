import React from "react";
import { Text, View } from "react-native";
import Navbar from "./Navbar";

function Settings() {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end",
      }}
    >
      <Text>Settings</Text>
      <Navbar />
    </View>
  );
}

export default Settings;
