import { useState } from "react";
import { Link, Redirect } from 'react-router-dom';

function SignupForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false); 

    const setToken = props["setToken"];
    const setLogin = props["setLoggedIn"];
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/auth/signup', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                new Error('invalid username or password');
            }
        })
        .then(result => {
            localStorage.removeItem('token');
            localStorage.setItem('token', result.accessToken);
            setToken(result.accessToken);
            setLogin(true);     
            setRedirect(true);
        })
        .catch(err => {
            console.log(err)
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
        return <Redirect to="/main"/>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "rgb(237, 237, 237)", width: "30vw", height:"50vh", margin: "auto", boxShadow: "3px 3px 5px grey" }}>
            <div>
                <h2 style={{marginTop: "30px", marginBottom: "30px"}}>Registrering</h2>
                <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", padding: "20px"}}>
                    <div style={{marginBottom: "10px"}}>
                        <input style={{width:"80%"}} value={username} onChange={handleUsernameChange} type="text" required={true} placeholder="Namn"/>
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <input style={{width:"80%"}} value={password} onChange={handlePasswordChange} type="password" required={true} placeholder="Lösenord"/>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", margin: "30px 34px 0 34px"}}>
                        <div/>
                        <input style={{ width: "30%"}} type="submit" value="Nästa"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;