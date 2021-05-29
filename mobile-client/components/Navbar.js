import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Link } from "react-router-native";

function Navbar() {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
      marginTop: 15,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ffd8a8",
        height: 85,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,

        elevation: 11,
      }}
    >
      <TouchableOpacity>
        <Link to="/conversation">
          <Image
            style={styles.tinyLogo}
            source={require("../assets/message.png")}
          />
        </Link>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link to="/search">
          <Image
            style={styles.tinyLogo}
            source={require("../assets/search.png")}
          />
        </Link>
      </TouchableOpacity>
      <TouchableOpacity>
        <Link to="/profile">
          <Image
            style={styles.tinyLogo}
            source={require("../assets/profile.png")}
          />
        </Link>
      </TouchableOpacity>
      <TouchableOpacity>
        <Link to="/settings">
          <Image
            style={styles.tinyLogo}
            source={require("../assets/settings.png")}
          />
        </Link>
      </TouchableOpacity>
    </View>
  );
}

export default Navbar;
