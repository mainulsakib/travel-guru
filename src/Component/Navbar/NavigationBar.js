import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

import logo from '../../Logo.png'

const NavigationBar = () => {
  const [loggedInUser, setLoggedInUser]= useContext(UserContext)
  const linkStyle ={
    margin: "10px 20px",
    color:"#FFFFFF",
    fontFamily: "Montserrat"
  }
  return (
    <div>
<Navbar style={{opacity:"10"}}  variant="light">
  <Form inline>
 <Link to="/home"><img style={{height:"80px",width:"150px",color:"white",filter:" brightness(0) invert(1)"}} src={logo} alt=""/></Link>
      <FormControl style={{opacity:'1'}}  placeholder="Search destination" className="mr-sm-2" />
    </Form>
    <Nav className="mr-auto">
      <Link   style={linkStyle}  to="news">News</Link>
      <Link style={linkStyle} to="/destination">Destination</Link>
      <Link style={linkStyle} to="blog">Blog</Link>
      <Link style={linkStyle} to="contact">Contact</Link>
    </Nav>
   {loggedInUser.isSignedIn? loggedInUser.name:<Button style={{backgroundColor: "#F9A51A",
borderRadius: "5px"}}><Link to="login"> Log in</Link></Button>}
  </Navbar>
  </div>
  );
};

export default NavigationBar;