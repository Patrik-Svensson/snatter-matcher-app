import React from "react";
import { Text, View, FlatList } from "react-native";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

function Message() {
  [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("chat message", (data) => {
      let newArray = [data];
      let con = [...messages, ...newArray];
      setMessages(con);
    });
  }, []);

  const mappedList = messages.map((el) => {
    return { key: el };
  });

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
      }}
    >
      <FlatList
        data={mappedList}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
    </View>
  );
}

export default Message;
