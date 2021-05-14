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
      <TouchableOpacity style={styles.button}>
        <Link to="/signup">
          <Text style={styles.buttonText}>Gå Med</Text>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.button, marginBottom: 50 }}>
        <Link to="/login">
          <Text style={styles.buttonText}>Logga In</Text>
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

export default Launch;
