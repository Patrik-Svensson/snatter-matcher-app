import { resolveUri } from "expo-asset/build/AssetSources";
import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-native";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputEmail, setInputEmail] = useState(true);
  const [redirect, setRedirect] = useState(false);

  function signupRequest() {
    fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    }).then((response) => {
      if (response.ok) {
        setRedirect(true);
      }
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
    <TouchableOpacity style={styles.button} onPress={signupRequest}>
      <Text style={styles.buttonText}>Fortsätt</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
      }}
    >
      {redirectElement}
      <Text style={{ fontSize: 33, marginBottom: 40 }}>Gå med i Asnatt</Text>
      {inputElement}
      {buttonElement}
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

export default Signup;
