import React, {Component, useState } from 'react';
import './Register.css'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {Button, Stack} from 'react-bootstrap';


function Register () {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history('/');
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    history('/');
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login' data-testid="login">
            <Link to='/'>
                <img
                    className="login__logo"
                    src='' 
                />
            </Link>

            <div className='outer inner'>
            <h3>Fennel Register</h3>
                <form>
                <div className="form-group">
                    <h5>Email</h5>
                    <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                    <h5>Password</h5>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                  


                
                <Button variant="danger" onClick={register} className="btn btn-lg btn-block">Create Account!</Button>
                </form>
            </div>
        </div>
    )
}

export default Register;