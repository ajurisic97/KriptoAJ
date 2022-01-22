import React, { useState, useEffect } from 'react';
import '../App.css';
import panel from '../services/users';
import NavBar from '../components/NavBar';
import Modal from 'react-modal';
import User from '../components/User';
export default function AdminPanel(){
    const [sviKorisnici, dohvatiKorisnike] = useState([]);
    const [pretraga,postaviPretragu] = useState('');
    const [userUsername, postaviUsername] = useState('');
    const [userIznos, postaviIznos] = useState(0);
    const [userPw, postaviPw] = useState('');
    const [userPw2, postaviPw2] = useState('');
    const [userMail, postaviMail]=useState('');
    const [korisnik, postaviKorisnika]=useState({});
    useEffect(()=>{
        const logiran = window.localStorage.getItem("logirani");
        console.log("ADMINPANEL LOGIRAN",logiran);
        if(logiran){
            panel.dohvatiSve().then((res)=>{
                dohvatiKorisnike(res.data);
                console.log("Podaci:",res.data);
            })
        } else{
            window.location = '/';
        }
    },[]);


    const urediUsera = (id) => {
        const u = sviKorisnici.find((u) => u.id === id);
        console.log("u",u);
        postaviKorisnika(u);
        console.log(korisnik);
    }

    const editUser = () => {

        const uredeniUser={
            ...korisnik,
            username: userUsername,
            password: userPw,
            password2: userPw2,
            email: userMail,
            stanje: userIznos,

        }
        console.log("Korisnik",korisnik);
        panel.urediUsera(korisnik.id, uredeniUser).then((res)=>{
            console.log("res",res);
            dohvatiKorisnike(sviKorisnici.map((u) => (u.id === korisnik.id ? res.data : u)));
        })
    }

    const deleteUser = (userId) =>{
        panel.izbrisiUsera(userId).then((res) => {
            const sviBezU = sviKorisnici.filter((ostavljeni) => ostavljeni.id != userId);
            
            dohvatiKorisnike(sviBezU);
        })
    }
    
   
    const handleChange = (e) => {
        postaviPretragu(e.target.value);
    }
    const filtriran = sviKorisnici.filter(user => 
        user.username.toLowerCase().includes(pretraga.toLowerCase())
    );

    return(
        <>
        <NavBar/>
        <div className="pocetna-sve">
        <div className="trazilica">
            <form>
                <input type="text" placeholder="Pretrazi po imenu" className="coin-unos" onChange={handleChange}/>
            </form>
        </div></div>
        
        <div className="classSviKorisnici">
            <ol className="rowKorisnik">
            
            {filtriran.map((u) => (
                <User
                key = {u.id}
                user={u}
                postaviMail={postaviMail}
                postaviPw={postaviPw}
                postaviPw2={postaviPw2}
                postaviStanje={postaviIznos}
                postaviUs={postaviUsername}
                urediUsera={() => urediUsera(u.id)}
                deleteKorisnika={()=> deleteUser(u.id)}
                editKorisnika={editUser} 
                />))
            }
            
          
            </ol>
        </div>
        
       
        </>
    )
}
