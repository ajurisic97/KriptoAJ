import React, { useState } from 'react';
import loginService from '../services/login';
import NavBar from '../components/NavBar';
import {Link} from 'react-router-dom';
export default function UserLogin(){
    const [username, postaviUsername] = useState('');
    const [password, postaviPassword] = useState('');
    const userLogin = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
        };
        try{
            const korisnik = await loginService.loginUser(user).then((response) => {
            window.localStorage.setItem('logirani',JSON.stringify(response.data));
            window.localStorage.setItem('uloga','user');
            window.location = '/portfolio'; 
            })
        }
        catch (exception){
            console.log("Neispravni podaci pri logiranju usera");
            window.location='/user/login';
        }
    }

    return(
        <>
        <NavBar/>
        
        <div className="login-box">
            <h2>User login</h2>
            <form onSubmit={userLogin} >
                <div className="user-box">
                    <input label="Username:" type="text" placeholder="upisi username..." onChange={(e)=> postaviUsername(e.target.value)} />
                </div>
                <div className="user-box">
                    <input label="Password:" type="password" placeholder="upisi password..." onChange={(e)=> postaviPassword(e.target.value)} />
                </div>
                <div>
                    <a>
                    
                    <button type="submit">Login
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button></a>
                </div>
                
            </form>
            <Link to='registration'>Nemate račun? Registrajte se</Link>
        </div>
        </>
    )
}