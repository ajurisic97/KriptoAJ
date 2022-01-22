import React, { useEffect, useState } from 'react';
import loginService from '../services/login';
import '../App.css';
import NavBar from '../components/NavBar';
import Trade from '../components/Trade';
import axios from 'axios';
export default function Favoriti(){
    useEffect(()=>{
        postaviCoins([]);
        setCrypto('');
        setPrice(0);
        setOptions([]);
        postaviOpcije([]);
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=1&sparkline=false')
        .then(res=> {
            postaviCoins(res.data);   
        }).catch(err => console.log("Error pri učitavanju") );
        coins.map(coin => {
            options.push({value: coin.current_price,
            label: coin.name})
            postaviOpcije(options);
        })
    },[])
    const [coins,postaviCoins]=useState([]);
    const [crypto,setCrypto]=useState('');
    const [price,setPrice]=useState(0);
    const [options, setOptions] = useState([]);
    const [opcije, postaviOpcije] = useState([]);
   
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const promjeniDohvacenu = (e) =>{
        setPrice(e.target.value);
        var index = e.target.selectedIndex;
        setCrypto(document.getElementsByTagName("select")[0][index].innerHTML);
    }
    return(
        <>
        <NavBar/>
        <Trade 
        promjeniDohvacenu={promjeniDohvacenu}
        nazivKripto={crypto}
        cijenaKupnje={price}
        coins={coins}
        options={options}
        />
        
        </>
    )
}