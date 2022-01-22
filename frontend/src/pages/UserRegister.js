import React, { useState } from 'react';
import loginService from '../services/login';
import List from 'react-list-select';
import NavBar from '../components/NavBar';
import {Link} from 'react-router-dom';
export default function UserRegistracija(){
    const [username, postaviUsername] = useState('');
    const [password, postaviPassword] = useState('');
    const [password2, postaviPassword2] = useState('');
    const [email,postaviEmail] = useState('');
    const [stanje,postaviStanje] = useState(100000);
    const userRegistration = async (e) => {
        e.preventDefault();
        const noviUser = {
            username: username,
            password: password,
            password2: password2,
            email: email,
            stanje: stanje
        };
        try{
            const korisnik = await loginService.registracija(noviUser).then((response) => {
                window.localStorage.setItem('logirani',JSON.stringify(response.data));
                window.localStorage.setItem('uloga','user');
                window.location = '/'; 
            })
        }
        catch (exception){
            alert("Neispravni podaci");
            window.location='/';
        }
    }
    
    return(
        <>
        <NavBar/>
        
        <div className="login-box">
            <h2>User registration</h2>
            <form onSubmit={userRegistration} >
                <div className="user-box">
                    <input label="Username:" type="text" placeholder="upisi username..." onChange={(e)=> postaviUsername(e.target.value)} />
                </div>
                <div className="user-box">
                    <input label="Password:" type="password" placeholder="upisi password..." onChange={(e)=> postaviPassword(e.target.value)} />
                </div>
                <div className="user-box">
                    <input label="Password2:" type="password" placeholder="ponovi password..." onChange={(e)=> postaviPassword2(e.target.value)} />
                </div>
                <div className="user-box">
                    <input label="Email" type="email" placeholder="upisi mail" onChange={(e)=> postaviEmail(e.target.value)}/>
                </div>
                <div className="user-box">
                    <input label="Stanje" type="number" placeholder="10000" step="10000" min="10000" max="1000000" onChange={(e)=> postaviStanje(e.target.value)}/>
                </div>
                <div>
                    <a>
                    
                    <button type="submit">Registracija
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button></a>
                </div>
                
            </form>
            <Link to='login'>Već imate korisnički račun? Ulogirajte se</Link>
        </div>
        </>
        
    )
}