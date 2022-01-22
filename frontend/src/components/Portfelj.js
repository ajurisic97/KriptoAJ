import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Portfelj({
    image,name,symbol,price,priceChange, kolicina, currentPrice
}){
        const [stanje,postaviStanje]=useState(0);
        const [profit, postaviProfit]=useState(0);
        var finalna=0;
        //console.log(name);
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd`).then((res)=>{
            var pokusaj = JSON.stringify(res.data).split(":");
            finalna = parseFloat(pokusaj[2].substring(0,pokusaj[2].length-2).trim());
            postaviStanje(finalna);
            postaviProfit(stanje*kolicina-kolicina*price);

        }).catch(err => console.log("Error pri učitavanju"));
        
        
        
    return(
        <div className='coin-container'>
        <div className='coin-row'>
            <div className="coin">
                <img src={image} alt='crypto'/> 
                <h1>{name}</h1>
                <p className="coin-symbol">{symbol}</p>
            </div>
            <div className="coin-data">
                <p className="coin-price">{price}$</p>
                <p className="coin-price">{kolicina}</p>
                <p className="coin-price">{stanje}$</p>
                {/* {priceChange < 0 ? (
                    <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
                ) : (<p className="coin-percent green">{priceChange.toFixed(2)}%</p>)
                } */}
                {profit < 0 ? (
                    <p className="coin-percent red">{profit.toFixed(2)}$</p>
                ) : (<p className="coin-percent green">{profit.toFixed(2)}$</p>)
                }
                
                
            
            </div>

        </div>
        

        </div>
    )
}