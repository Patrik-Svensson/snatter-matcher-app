import React, { Profiler } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Launch from "./components/Lauch";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/Main";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Message from "./components/Message";
import Search from "./components/Search";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          marginTop: 210,
          fontSize: 50,
          fontWeight: "bold",
          color: "#FFA940",
          // fontFamily: Roboto,
        }}
      >
        Asnatt
      </Text>
      <NativeRouter>
        <Route exact path="/" component={Launch} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/message" component={Message} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" component={Main} />
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#FFA940",
    minWidth: "70%",
    margin: 10,
    padding: 10,
    borderRadius: 9,
  },
  buttonText: {
    fontSize: 30,
  },
});
