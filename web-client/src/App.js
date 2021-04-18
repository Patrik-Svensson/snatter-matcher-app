import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NavigationBar from './Components/NavigationBar'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');



  useEffect(() => {
    const userToken = localStorage.getItem('token');

    if(userToken !== null)
    {
      fetch('http://localhost:3001/auth/token-validation', { 
        method: 'get',
        headers: {'Content-Type':'application/json',
                  'Authorization':`Bearer ${userToken}`}
      })
      .then(response => {
        
        if(response.ok){
          setLoggedIn(true);
          setToken(userToken);
        }
      })
    }
  });

  return (
    <div>
      <BrowserRouter>
        <NavigationBar loggedIn={loggedIn} setLogin={setLoggedIn}/>
        <Switch>
          <Route path="/login">
            <LoginPage setLoggedIn={setLoggedIn} setToken={setToken} setUser={setUser}/>
          </Route>
          <Route path="/signup">
            <SignupPage setLoggedIn={setLoggedIn} setToken={setToken}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
