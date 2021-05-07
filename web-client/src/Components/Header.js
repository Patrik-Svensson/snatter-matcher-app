import React from "react";
import { Link } from "react-router-dom";

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "60px",
  backgroundColor: "#f5f5f5",
  boxShadow: "1px 3px 5px #9E9E9E",
};

const navigationPanelStyle = {
  display: "flex",
  width: "10%",
  justifyContent: "space-around",
};

function Header(props) {
  function onLogout() {
    setLogin(false);
    localStorage.removeItem("token");
  }

  const isLoggedin = props["loggedIn"];
  const setLogin = props["setLogin"];

  let loginButton;
  let profileLink = <React.Fragment />;

  if (isLoggedin) {
    profileLink = <Link to="/profile">Profil</Link>;

    loginButton = (
      <div>
        <Link to="/home">
          <button onClick={onLogout} style={{ margin: "0px 10px" }}>
            Logga ut
          </button>
        </Link>
      </div>
    );
  } else {
    loginButton = (
      <div>
        <Link to="/login">
          <button style={{ margin: "0px 10px" }}>Logga in</button>
        </Link>
        <Link to="/signup">
          <button style={{ margin: "0px 10px" }}>Registrera dig</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={headerStyle}>
      <div style={navigationPanelStyle}>
        <div>
          <Link to="/home">Hem </Link>
        </div>
        <div>
          <Link to="/browse">Bläddra</Link>
        </div>
      </div>
      {loginButton}
    </div>
  );
}

export default Header;
