import React, { useState, useEffect } from 'react';
import portfolioService from '../services/portfolios'
import loginService from '../services/users';
import '../App.css';
import NavBar from '../components/NavBar';
import Sell from '../components/Sell';


export default function SellCrypto(){ 
    const [portfelj, postaviPortfelj]=useState([]);
    const [kopija,postaviKopiju]=useState([]);
    const [korisnik,setKorisnik]=useState({});
    useEffect(()=>{
        const logiranUser = window.localStorage.getItem('logirani');
        var user2;
        if(logiranUser){
            user2 = JSON.parse(logiranUser);
            portfolioService.postaviToken(user2.token);
            
        }
        else{
            console.log("Nije logiran");
            window.location='/';
        }
        portfolioService.dohvatiSve().then((res)=>{
            postaviPortfelj(res.data);
            
        })
        
        
        //console.log("PORT",portfelj[0].user);
        
        if(kopija.length<=portfelj.length){
            portfelj.map(p=>{
                var x = {
                    naziv: p.nazivKripto,
                    kolicina: p.kolicina,
                    stanje: p.cijenaKupnje*200
                }
                postaviKopiju(oldArray => [...oldArray,x]);
                console.log(kopija);
            })
        }
        
        // portfolioService.dohvatiUsera(portfelj[0].user).then((res)=>{
            
        //     postaviStanje(res.data.stanje);
        //     setKorisnik(res.data);
        // })
        
        // document.getElementById("idStanje").innerText=korisnik[0].stanje+"$";

    },[])


    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    const prodajKripto = () => {
        var index = document.getElementById("mySelect").selectedIndex;
        if(index==-1){
            alert("NEMA ODABIRA");
            window.location="/";
        }
        console.log(document.getElementsByClassName("selectSell")[0][index].label);
        const idPortfolio = document.getElementsByClassName("selectSell")[0][index].value;
        const logiranUser = window.localStorage.getItem('logirani');
        const user2 = JSON.parse(logiranUser);
        portfolioService.postaviToken(user2.token);

        
        console.log("USER",korisnik);

        portfolioService.izbrisiPortfolio(idPortfolio);
        alert("Uspješno ste prodali kriptovalutu :)");
        window.location='/portfolio';

    }

    return(
        <><NavBar />
        <div className="pocetna-sve">
            <form className="sideBySideForm" onSubmit={handleSubmit}>
                <h1>Sell Crypto</h1>
                
                <button className="bn632-hover bn25" onClick={prodajKripto}>Prodaj</button>
                <select className="selectSell" id="mySelect">{portfelj.map(p => {
                    //console.log(p);
                    return (<option key={p.id} value={p.id} label={p.nazivKripto}>{p.nazivKripto}</option>);
                })}
                </select><br />
                <div className="coin-row">
                    <div className="coin"><p>Naziv: </p></div>
                    <div className="coin"><p>Kolicina: </p></div>
                    <div className="coin-price"><p>Pocetno:</p></div>
                    <div className="coin-price"><p>Sada:</p></div>
                </div>
                {portfelj.map(p => {
                    return (
                        <Sell
                            key={p.id}
                            name={p.nazivKripto}
                            kolicina={p.kolicina} 
                            kupnja = {p.cijenaKupnje*p.kolicina}/>
                    );
                })}



            </form>

        </div></>
    )
}