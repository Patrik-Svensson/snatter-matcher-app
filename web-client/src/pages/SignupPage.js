import React, { useState } from "react"
import SignupForm from '../Components/SignupForm'


function SignupPage(props) {

    return(
        <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
            <SignupForm setToken={props["setToken"]} setLoggedIn={props["setLoggedIn"]} />
        </div>
    );
}

export default SignupPage