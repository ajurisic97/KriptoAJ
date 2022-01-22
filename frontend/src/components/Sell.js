import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Sell({
    name,kolicina,kupnja
}){
        const [stanje,postaviStanje]=useState(0);
        var finalna=0;
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd`).then((res)=>{
            var pokusaj = JSON.stringify(res.data).split(":");
            finalna = parseFloat(pokusaj[2].substring(0,pokusaj[2].length-2).trim());
            postaviStanje(finalna);

        }).catch(err => console.log("Error pri učitavanju"));
    return(
    <>
    <div className="coin-row">
        <div className="coin"><p><label>{name}</label></p></div>
        <div className="coin"><p><label>{kolicina}</label><br/></p></div>
        <div className="coin-price"><p><label>{kupnja}</label>$<br/></p></div>
        <div className="coin-price"><label>{stanje*kolicina}</label>$<br/></div>
    </div>
    </>
    )
}