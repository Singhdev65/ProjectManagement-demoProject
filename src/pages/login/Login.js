import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { auth, provider } from '../../firebase';
import './Login.css';
import {actionTypes} from '../../reducer'
import { useStateValue } from '../../StateProvider';

const Login = () => {
    const [{}, dispatch] = useStateValue();

    const signInWithGoogle = () => {
        auth.signInWithPopup(provider).then(result => dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        }))
            .catch((error) => alert(error.message));
    }

    useEffect(() => {
        auth.onAuthStateChanged((currentUser) => {
                 if(currentUser) {
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: currentUser,
                    })
                 }
        })
    }, [])

    return (
        <div className="login">
            <div className="login__header">
                <div className="login__headerLeft">
                    <h2><span>Project</span>Management</h2>
                </div>

                <div className="login__headerRight">
                    <p >login</p>
                    <p >Register</p>
                </div>
            </div>

            <div className="login__body">

                <form>
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="password" />
                    <Button variant="contained" color="primary" style={{ marginTop: "1rem", background: "#007bff" }}
                    >Login</Button>
                    <Button variant="contained" color="primary" style={{ marginTop: "1rem", background: "#007bff" }}
                    onClick={signInWithGoogle}
                    >Login with Google</Button>
                </form>

            </div>
        </div>
    )
}

export default Login;
