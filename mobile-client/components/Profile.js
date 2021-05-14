import React from "react";
import { Text, View } from "react-native";
import Navbar from "./Navbar";

function Profile() {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end",
      }}
    >
      <Text>Profile</Text>
      <Navbar />
    </View>
  );
}

export default Profile;
