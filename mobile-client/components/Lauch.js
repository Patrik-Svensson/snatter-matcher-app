import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
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
      <TouchableOpacity style={styles.button}>
        <Link to="/signup">
          <Text style={styles.buttonText}>Create an account</Text>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.button, marginBottom: 100 }}>
        <Link to="/login">
          <Text style={styles.buttonText}>Log in</Text>
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.36,
    // shadowRadius: 6.68,
    elevation: 11,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    color: "#fff",
  },
});

export default Launch;
