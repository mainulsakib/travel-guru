import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.cofig';
import GoogleLogo from '../../Icon/google.png'
import { Form } from 'react-bootstrap';
import facebookLogo from '../../Icon/fb.png'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history=useHistory();
    const location =useLocation();
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
    const handleGoogleSignIn = () => {


        firebase.auth().signInWithPopup(provider)
            .then(res => {
                let { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    
                }
                setLoggedInUser(signedInUser)
                setUser(signedInUser)
                history.replace(from)
                console.log(displayName, photoURL, email)
                // ...
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res)
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
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
                    console.log(res)
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    updateUserInfo(user.name)
                    setLoggedInUser(newUserInfo)
                    history.replace(from)
                    console.log(newUserInfo)
                })
                .catch(function (error) {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    setUser(newUserInfo)
                    // ...
                });
        }
        e.preventDefault()
    }
    const handleChange = (e) => {
        let isFieldValid = true
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

        }
        if (e.target.name === 'password') {
            isFieldValid = e.target.value > 6 && /\d{1}/.test(e.target.value)

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

            
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }
    const handleFacebookSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    return (
        <div style={{ color: 'white' }}>
            <Form onSubmit={handleSubmit} style={{ width: "40%",align: "center",height: "50%",}}>
                {newUser && <div>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name="name" onBlur={handleChange} type="text" required placeholder="name" />

                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="name" onBlur={handleChange} type="text" required placeholder="name" />
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
                    <Form.Control name="Confirm" onBlur={handleChange} type="text" required placeholder="Confirm Password" />

                </Form.Group>}
                <input type="submit" value="Submit"></input>
            </Form>
            <p>{user.error}</p>
            {newUser ? <div><p>already have an account?</p><p onClick={() => setNewUser(!newUser)}>Sign in</p> </div> :
                <p onClick={() => setNewUser(!newUser)}>sign up</p>}

            {
                user.isSignedIn ? <p>welcome</p> :
                    <div>
                        <img style={{ width: '20px', height: '20px', float: 'left', margin: '5px' }} src={GoogleLogo} alt="" />
                        <p onClick={handleGoogleSignIn}>Sign in with google</p>
                    </div>
            }
            {
                user.isSignedIn &&
                <div>
                    <h1> {user.name}</h1>
                </div>
            }
            <img style={{ width: '20px', height: '20px', float: 'left', margin: '5px' }} src={facebookLogo} alt="" />
            <p onClick={handleFacebookSignIn}>Sign in with facebook</p>
        </div>
    );
};

export default Login;