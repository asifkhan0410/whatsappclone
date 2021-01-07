import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth, provider} from "./firebase"
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';


function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn =() => {
        auth.signInWithPopup(provider).then((result)=> {
            dispatch({
                type : actionTypes.SET_USER,
                user : result.user,
            });
        }).catch((error)=> alert(error.message));
    };

    return (
        <div className="login">
            <div className="login_container">
                <img 
                src="https://www.jing.fm/clipimg/full/100-1000085_clip-art-png-png-vector-whatsapp-logo.png"
                alt=""/>
                <div className="login_text">
                    <h1>Sign-In to WhatsApp</h1>
                </div>

                <Button onClick ={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
