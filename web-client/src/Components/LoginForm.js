import { useState } from "react";
import { Link, Redirect } from 'react-router-dom';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false); 

    const setToken = props["setToken"];
    const setLogin = props["setLoggedIn"];
    const setUser = props["setUser"];
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/auth/login', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
        .then(response => response.json())
        .then(result => {
            localStorage.removeItem('token');
            localStorage.setItem('token', result.accessToken);
            setToken(result.accessToken);
            setLogin(true);
            setUsername(username);  
            setUser(username);   
            setRedirect(true);
        })
    }

    const handleUsernameChange = (event) => {
        event.preventDefault();
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    if (redirect) {
        return <Redirect to="/manage-streams"/>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "rgb(237, 237, 237)", width: "30vw", height:"50vh", margin: "auto", boxShadow: "3px 3px 5px grey" }}>
            <div>
                <h2 style={{marginTop: "30px", marginBottom: "30px"}}>Login</h2>
                <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", padding: "20px"}}>
                    <div style={{marginBottom: "10px"}}>
                        <input style={{width:"80%"}} value={username} onChange={handleUsernameChange} type="email" required={true} placeholder="E-mail"/>
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <input style={{width:"80%"}} value={password} onChange={handlePasswordChange} type="password" required={true} placeholder="Lösenord"/>
                    </div>
                    
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "30px 34px 0 34px"}}>
                        <Link to="/register">Skapa konto</Link>
                        <input style={{ width: "30%"}} type="submit" value="Nästa"></input>
                    </div>
                </form>
            </div>
            <Link style={{marginBottom: "15px"}} to="/password-retrieval">Glömt Lösenord</Link>
        </div>
    );
}

export default LoginForm;