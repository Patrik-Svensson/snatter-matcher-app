import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { Link } from "react-router-native";

function Launch() {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Text
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 210,
          fontSize: 50,
          fontWeight: "bold",
          color: "#FFA940",
          // fontFamily: Roboto,
        }}
      >
        Asnatt
      </Text>

      <TextInput
        style={{ ...styles.input, marginBottom: 25 }}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor="#000000"
        autoCapitalize="none"
        //onChangeText={this.handleEmail}
      />

      <TextInput
        style={{ ...styles.input, marginBottom: 5 }}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor="#000000"
        autoCapitalize="none"
        // onChangeText={this.handlePassword}
      />

      <TouchableOpacity style={{ marginBottom: 80 }}>
        <Link to="/signup">
          <Text
            style={{
              fontSize: 16,
              color: "#0B1E82",
              fontWeight: "bold",
            }}
          >
            Forgot your password?
          </Text>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity style={{ ...styles.button, marginBottom: 200 }}>
        <Link to="/login">
          <Text style={styles.buttonText}>Log in</Text>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity style={{ ...styles.button, marginBottom: 50 }}>
        <Link to="/signup">
          <Text style={styles.buttonText}>Create an account</Text>
        </Link>
      </TouchableOpacity>
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
    minHeight: "1%",
    margin: 10,
    padding: 15,
    borderRadius: 30,
    borderRadius: 9,
    elevation: 11,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    color: "#fff",
  },
  input: {
    minWidth: "70%",
    minHeight: "5%",
    fontSize: 20,
    borderColor: "#FFA940",
    borderWidth: 3,
  },
});

export default Launch;
