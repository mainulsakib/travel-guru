import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.cofig';
import { Form } from 'react-bootstrap';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: ''
    })
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    var provider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    //   Google Sign In
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                let { displayName, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                }
                setLoggedInUser(signedInUser)
                setUser(signedInUser)
                history.replace(from)
            })
            .catch(err => {
                const newUserInfo = { ...user }
                newUserInfo.error = err.message;
                setUser(newUserInfo)
            })
    }
    // form Sign in 
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res)
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.isSignedIn=true
                    newUserInfo.name=res.name;
                    setUser(newUserInfo)
                    setLoggedInUser(newUserInfo)
                    updateUserInfo(user.name)
                    history.replace(from)
                })
                
                .catch(function (error) {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    setUser(newUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res.user)
                    const newUserInfo = { ...user }
                    newUserInfo.isSignedIn=true
                    newUserInfo.error = '';
                   setUser(newUserInfo);
                  setLoggedInUser(newUserInfo)
              history.replace(from)
              console.log('sign in successfully',res.user)
       })
                .catch(function (error) {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    setUser(newUserInfo)
         });
        }
        e.preventDefault()
    }
    const handleChange = (e) => {

        let isFieldValid = true
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

        }
        if (e.target.name === 'password' && e.target.name === 'confirmPassword') {
           
            isFieldValid = e.target.value > 6 && /\d{1}/.test(e.target.value)
            console.log(isFieldValid)

        }
        if (isFieldValid === true) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }
    const updateUserInfo = name => {
        var user = firebase.auth().currentUser;
         user.updateProfile({
          displayName: name,
        }).then(function() {
          console.log("user name successfully")
        }).catch(function(error) {
         console.log(error)
        });
    }
    // facebook sign in
    const handleFacebookSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then(res => {
                let { name, email } = res.additionalUserInfo.profile
                const signedInUser = {
                    isSignedIn: true,
                    name: name,
                    email: email,
       }
                setLoggedInUser(signedInUser)
                setUser(signedInUser)
                history.replace(from)
                console.log(name, email)
            })
            .catch(function (error) {
                const newUserInfo = { ...user }
                newUserInfo.error = error.message;
                setUser(newUserInfo)
            });
    }
 

    return (
        <div style={{ color: 'white' }}>
            <Form onSubmit={handleSubmit} style={{ border: "1px solid black", backgroundColor: "white", margin: '0 auto', padding: '20px', color: "black", borderRadius: "4px", width: '50%' }}>
                {newUser && <div>

                    <Form.Group controlId="Name">
                        <Form.Label> Name</Form.Label>
                        <Form.Control name="name" onBlur={handleChange} type="text" required placeholder="full name" />
                    </Form.Group>
                </div>
                }
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" onBlur={handleChange} type="email" required placeholder="Enter email" />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" onBlur={handleChange} type="password" required placeholder="Password" />
                </Form.Group>
                {newUser && <Form.Group controlId="Name">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name="ConfirmPassword" onBlur={handleChange} type="password" required placeholder="Confirm Password" />

                </Form.Group>}
                <input style={{backgroundColor: "#F9A51A",borderRadius: "5px"}} type="submit" value="Submit"></input>

                {
                newUser ? <div><p style={{ float: 'left' }}> already have an account?</p><p style={{ color: "orange", cursor: "pointer",textDecoration: "underline" }} onClick={() => setNewUser(!newUser)}>Sign in</p> </div> :
                    <div> <p style={{ float: 'left' }}>want to create an account?</p><p style={{ color: "orange",cursor:"pointer" ,textDecoration: "underline" }} onClick={() => setNewUser(!newUser)}>sign up</p></div>}
            </Form>
           

                <div style={{textAlign: 'center',margin:"0 auto"}}> 
                    <p>{user.error}</p> 
            {
                user.isSignedIn ? <p>welcome</p> : <p style={{cursor:'pointer' }} onClick={handleGoogleSignIn}>Sign in with google</p>
            }
            {
                user.isSignedIn &&
                <div>
                    <h1> {user.name}</h1>
                </div>
            }
            
            <p style={{cursor:'pointer'}} onClick={handleFacebookSignIn}>Sign in with facebook</p>
                </div>
        </div>
    );
};

export default Login;