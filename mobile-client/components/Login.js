import { func } from "prop-types";
import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-native";
import * as SecureStore from "expo-secure-store";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

const LOGIN_URL = "http://localhost:3001/auth/login";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputEmail, setInputEmail] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const setJwt = props["setJwt"];

  function loginRequest() {
    fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setRedirect(true);
          return response.json();
        }
      })
      .then(async (data) => {
        const token = data.token;
        await SecureStore.setItemAsync("secure_token", token);
        setJwt(token);
      });
  }

  var redirectElement = redirect ? <Redirect to="/Main" /> : <React.Fragment />;
  var inputElement = inputEmail ? (
    <TextInput
      style={styles.input}
      placeholder="email"
      onChangeText={setEmail}
      value={email}
    />
  ) : (
    <TextInput
      style={styles.input}
      secureTextEntry={true}
      placeholder="lösenord"
      onChangeText={setPassword}
      value={password}
    />
  );

  var buttonElement = inputEmail ? (
    <TouchableOpacity
      style={styles.button}
      onPress={() => setInputEmail(false)}
    >
      <Text style={styles.buttonText}>Fortsätt</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.button} onPress={loginRequest}>
      <Text style={styles.buttonText}>Fortsätt</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
      }}
    >
      <Link to="/">
        <Image
          source={require("../assets/back.png")}
          style={{
            height: 30,
            width: 30,
            alignSelf: "flex-end",
            marginTop: 80,
            marginRight: 40,
          }}
        />
      </Link>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 180,
        }}
      >
        {redirectElement}
        <Text style={{ fontSize: 33, marginBottom: 40 }}>Log in to Asnatt</Text>
        {inputElement}
        {buttonElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "70%",
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#FFA940",
    width: "70%",
    margin: 10,
    padding: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    color: "black",
  },
});

export default Login;
