import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function User({user,urediUsera,editKorisnika,postaviUs,deleteKorisnika,
postaviPw,postaviPw2,postaviStanje,postaviMail}) {

    const promjenaUsername = (e) => {
        postaviUs(e.target.value);
    };
    const promjenaPassword = (e) => {
        postaviPw(e.target.value);
    };
    const promjenaPassword2 = (e) => {
        postaviPw2(e.target.value);
    };
    const promjenaStanje = (e) => {
        postaviStanje(e.target.value);
    };
    const promjenaMail = (e) => {
        postaviMail(e.target.value);
    };
    return (
    <>
    <li>
      <div className="admin-container">
        <input type="text" defaultValue={user.username} onChange={promjenaUsername}/>
        <input type="password" placeholder="Promjena lozinke" onChange={promjenaPassword} defaultValue={user.password}/>
        <input type="password" placeholder="Ponovi lozinku" onChange={promjenaPassword2}/>
        <input type="email" defaultValue={user.email} onChange={promjenaMail}/>
        <input type="number" placeholder="Unesi stanje" defaultValue={user.stanje} onChange={promjenaStanje}/>
        <input type="button" value="Spremi info." onClick={urediUsera}/>
        <input type="button" value="Potvrdi promjenu" onClick={editKorisnika}/>
        <input type="button" value="Izbrisi" onClick={deleteKorisnika}/>
        
        
      </div>
    </li>
    
    </>
  );
}
