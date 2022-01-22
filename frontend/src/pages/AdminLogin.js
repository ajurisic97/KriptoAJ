import React,{ useState } from 'react';
import loginService from '../services/login';
import '../App.css';
import NavBar from '../components/NavBar';

export default function AdminLogin(){
    const [username2, postaviUsername] = useState('');
    const [password2, postaviPassword] = useState('');
    
    const adminLogin = async (e) => {
        e.preventDefault();

        
        const admin = {
            username: username2,
            password: password2
        };

        try{
            console.log(admin);
            await loginService.loginAdmin(admin).then((response) => {
            window.localStorage.setItem('logirani',JSON.stringify(response.data));
            window.localStorage.setItem('uloga','admin');
            
            window.location = '/adminpanel'; 
            })
        }
        catch (exception){
            console.log("Neispravni podaci pri logiranju administratora");
            window.location='/adminlogin';
        }
    }

    
    return(
        <>
        <NavBar/>
        <div className="login-box">
            <h2>ADMIN login</h2>
            <form onSubmit={adminLogin} >
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
            
        </div>
        </>
        

    )
}