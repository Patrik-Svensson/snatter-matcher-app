import React from "react";
import { Text, View } from "react-native";
import Navbar from "./Navbar";

function Message() {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end",
      }}
    >
      <Text>Message</Text>
      <Navbar />
    </View>
  );
}

export default Message;
