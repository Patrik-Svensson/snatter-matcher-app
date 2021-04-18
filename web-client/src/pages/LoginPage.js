import LoginForm from '../Components/LoginForm'

function LoginPage(props) {

    return(
        <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
            <LoginForm setToken={props["setToken"]} setLoggedIn={props["setLoggedIn"]} setUser={props["setUser"]} />
        </div>
    );
}

export default LoginPage;