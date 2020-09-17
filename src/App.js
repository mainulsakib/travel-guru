import React, { createContext, useState } from 'react';
import { BrowserRouter as Router,  Switch, Route} from "react-router-dom";
import './App.css';
import DestinationDetail from './Component/DestinationDetail/DestinationDetail';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import NavigationBar from './Component/Navbar/NavigationBar';
import News from './Component/News/News';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import RoomInfo from './Component/RoomInfo/RoomInfo';

export const UserContext=createContext()


function App() {
  const [loggedInUser,setLoggedInUser]=useState({})
  
  return (
    <div style={{maxHeight:'100%'}} className="App">
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>

     <Router>
       <NavigationBar></NavigationBar>
       <Switch>
         <Route path="/home">
       <Home></Home>
         </Route>
           <Route path="/news">
             <News></News>
            </Route>
            <Route path="/destination/:destinationId">
              <DestinationDetail></DestinationDetail>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/roominfo">
              <RoomInfo></RoomInfo>
            </PrivateRoute>
            <Route exact path="/">
            <Home></Home>
            </Route>
       </Switch>
     </Router>
     </UserContext.Provider>
     </div>
  );
}

export default App;
