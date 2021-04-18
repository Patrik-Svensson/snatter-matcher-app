import React from 'react';
import { Nav, Navbar, Form, Button, FormControl } from 'react-bootstrap';
import{
  NavLink,
  Link
} from "react-router-dom";


function NavigationBar(props){
  function onLogout()
  {
    console.log('logout')
    setLogin(false)
    localStorage.removeItem('token')
  }


    const isLoggedin = props["loggedIn"];
    const setLogin = props["setLogin"]

    let loginButton;
    let managementLink = <React.Fragment/>

    if (isLoggedin){
      managementLink = (          
      <Nav.Item>
        <NavLink to="/manage" className="h5">Hantera</NavLink>
      </Nav.Item>)

      loginButton = 
      (<div>
        <Link to="/home">
          <Button onClick={onLogout} style={{margin: "0px 10px"}}>Logga ut</Button>
        </Link>
      </div>)
    } else {
       loginButton = 
       (<div>
        <Link to="/login">
            <Button style={{margin: "0px 10px"}}>Logga in</Button>
        </Link>
        <Link to="/signup">
          <Button style={{margin: "0px 10px"}}>Registrera dig</Button>
        </Link>
       </div>)
    }   

    return(
      <Navbar className="justify-content-between" style={{backgroundColor: "#f5f5f5", boxShadow: "1px 3px 5px #9E9E9E"}}> 
        <Nav>
          <Nav.Item>
            <NavLink to="/home" className="h5">Hem</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/browse" className="h5">Bläddra</NavLink>
          </Nav.Item>
          {managementLink}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{width:400}} />
          <Button variant="outline-success">Search</Button>
        </Form>
        {loginButton}
      </Navbar>
    )
}

export default NavigationBar;