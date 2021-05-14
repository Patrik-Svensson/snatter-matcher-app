import React from "react";
import { Text, View } from "react-native";
import Navbar from "./Navbar";

function Search() {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end",
      }}
    >
      <Text>Search</Text>
      <Navbar />
    </View>
  );
}

export default Search;
