import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import Navbar from "./Navbar.js";
import React from "react";

const CONVERSATION_URL = "http://localhost:3001/conversation/";

function Convesations(props) {
  const [conversations, setConversations] = useState([]);
  var jwt = props["jwt"];

  useEffect(() => {
    fetch(CONVERSATION_URL, {
      method: "GET",
      headers: { Authorization: "bearer " + jwt },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setConversations(data);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        {conversations.map((x) => (
          <View
            key={x.id}
            style={{
              flexDirection: "row",
              borderBottomWidth: 0.5,
              borderColor: "#ebebeb",
            }}
          >
            <Image
              style={{ margin: 5, height: 80, width: 80, borderRadius: 50 }}
              source={require("../stock-profile.jpeg")}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 25 }}>{x.name}</Text>
              <Text>{x.lastMessage}</Text>
            </View>
          </View>
        ))}
      </View>
      <Navbar />
    </View>
  );
}

export default Convesations;
