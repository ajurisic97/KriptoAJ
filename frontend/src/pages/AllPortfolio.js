import React, { useEffect, useState } from 'react';
import loginService from '../services/login';
import portfolioService from '../services/portfolios';
import '../App.css';
import NavBar from '../components/NavBar';
import Portfelj from '../components/Portfelj';
import User from '../components/User';

import axios from 'axios';
export default function AllPortfolio(){
    //sveKripto za vanjski api za dohvatit sve zbog cijene
    const [cijeliPortfelj, postaviPortfelj] = useState([]);
    const [sviKorisnici, dohvatiKorisnike] = useState([]);

    useEffect(()=>{
        const logiranUser = window.localStorage.getItem('logirani');
        const user2 = JSON.parse(logiranUser);
        console.log(user2);
        //console.log(user2);
        portfolioService.postaviToken(user2.token);
        portfolioService.dohvatiSve().then((res)=>{
            postaviPortfelj(res.data);
        })
    },[]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
    }
      
    
    return(
        <>
        <NavBar/>
        <div className="pocetna-sve">
            <h1>Portfolio</h1>
            <div className='coin-container'>
                <div className='coin-row'>
                    <div className="coin">
                        <p> </p>
                        <h1>Cryptocurrency</h1>
                        <p className="coin-symbol">Short</p>
                    </div>
                    <div className="coin-data">
                        <p className="coin-price">Cijena kupnje</p>
                        <p className="coin-price">Kol.</p>
                        <p className="coin-price">Trenutna cijena</p>
                        {/* <p className="coin-percent">24h</p> */}
                        <p className="coin-marketcap">Profit </p>
                    </div>
                </div>
            </div>
        </div>
        

            {cijeliPortfelj.map(portf => {
                return(
                <Portfelj
                    key = {portf.id}
                    image={'https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Dogecoin_Logo.png/150px-Dogecoin_Logo.png'}
                    name={portf.nazivKripto}
                    symbol={portf.skraceniNaziv}
                    price={portf.cijenaKupnje}
                    /*profit={(stanje*portf.kolicina)-(portf.cijenaKupnje*portf.kolicina)}*/
                    
                    kolicina={portf.kolicina}
                    priceChange={0}
                />
                
                )
                })
            }
        
        
            
            
        </>
    )
}