import React from "react";
import { useState } from "react";
import { Text, View, Ino, TextInput } from "react-native";
import Navbar from "./Navbar";

const PROFILE_URL = "http://localhost:3001/profile";

function Profile() {
  const [firstName, setFirstName] = useState("patrik");
  const [lastName, setLastName] = useState("svensson");
  const [age, setAge] = useState(27);
  const [description, setDescription] = useState("I am a software engineer");
  const [jobs, setJobs] = useState(["manager", "engineer", "developer"]);
  const [educations, setEducations] = useState([
    "manager",
    "engineer",
    "developer",
  ]);
  const [lookingFor, setLookingFor] = useState([]);
  const [offering, setOffering] = useState([]);
  const [image, setImage] = useState("");

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end",
      }}
    >
      <View>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput placeholder="Age" value={age} onChangeText={setAge} />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <Navbar />
    </View>
  );
}

export default Profile;
