import { useState } from "react";

const PROFILE_URL = "http://localhost:3001/profile";

function ProfilePage(props) {
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

  const jobTags = [];
  jobs.forEach((element) => {
    jobTags.push(<input type="text" value={element} />);
  });

  const handleFirstNameChange = (event) => {
    event.preventDefault();
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    event.preventDefault();
    setLastName(event.target.value);
  };

  const handleAgeChange = (event) => {
    event.preventDefault();
    setAge(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form
        method="post"
        action={PROFILE_URL}
        style={{ display: "flex", flexDirection: "column", width: "70%" }}
      >
        <label>First Name</label>
        <input
          type="text"
          onChange={handleFirstNameChange}
          placeholder="First Name"
          value={firstName}
        />
        <label>Last Name</label>
        <input
          type="text"
          onChange={handleLastNameChange}
          placeholder="Last Name"
          value={lastName}
        />
        <label>Age Name</label>
        <input
          type="number"
          onChange={handleAgeChange}
          placeholder="Age"
          value={age}
        />
        <label>Description</label>
        <input
          type="text"
          onChange={handleDescriptionChange}
          placeholder="Description"
          value={description}
        />

        <label>Jobs</label>
        {jobTags}

        <input type="submit" />
      </form>
    </div>
  );
}

export default ProfilePage;
