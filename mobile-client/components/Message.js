import React from "react";
import {
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

function Message() {
  [messages, setMessages] = useState([]);
  [messageInput, setMessageInput] = useState("");

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
        justifyContent: "center",
      }}
    >
      <FlatList
        data={mappedList}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
      <TextInput
        style={{ marginLeft: 20, borderWidth: 1, width: 300 }}
        value={messageInput}
        onChangeText={setMessageInput}
      />
      <TouchableOpacity
        style={{ marginLeft: 20 }}
        onPress={() => {
          const socket = socketIOClient(ENDPOINT);
          socket.emit("chat message", messageInput);
        }}
      >
        <Text>Skicka</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Message;
