import React, { useState, useEffect } from 'react';
import portfolioService from '../services/portfolios'
import '../App.css';
import NavBar from '../components/NavBar';
import axios from 'axios';
import User from '../components/User';
import panel from '../services/users';

export default function BuyCrypto(){ 
    const [sviKorisnici, dohvatiKorisnike] = useState([]);
    const [nazivKripto, setCrypto] = useState("");
    const [skraceniNaziv, setShort] = useState("");
    const [kolicina, setQuantity] = useState(0);
    const [cijenaKupnje, setPrice]=useState(0);
    const [coins,postaviCoins]= useState([]);
    const [opcije, postaviOpcije] = useState([]);
    const [refresh,postaviRefresh]=useState(true);
    const [korisnik, postaviKorisnika]=useState({});
    const [gledanost,postaviGledanost]=useState("hidden");
    const [gledanost2,postaviGledanost2]=useState("hidden");
    const [portfelj, postaviPortfelj]=useState([]);
    const [stanje,postaviStanje]=useState(0);
    const [nizCijena,postaviNiz]=useState([]);
    const [cryptoData, postaviCrypto]=useState({});

    const promjeniDohvacenu = (e) =>{
        postaviRefresh(!refresh);
        setPrice(e.target.value);

        //setQuantity(e.target.value);
        var index = e.target.selectedIndex;
        setCrypto(document.getElementsByClassName("selectBuy")[0][index].innerHTML);      
    }
    useEffect(()=>{
        panel.dohvatiSve().then((res)=>{
            dohvatiKorisnike(res.data);
        })
        
    })
    
    const ucitajPodatke = () => {
        postaviRefresh(!refresh);
        postaviGledanost("visible");
        postaviGledanost2("hidden");
        setCrypto(document.getElementById("idCrypto").innerHTML);
        //console.log(nazivKripto);
        axios.get(`https://api.coingecko.com/api/v3/coins/${nazivKripto}`).then((res)=>{
            postaviCrypto(res.data);
            if(kolicina>0){
                var noviObjekt={
                    nazivKripto: res.data.id,
                    skraceniNaziv: res.data.symbol,
                    cijenaKupnje: cijenaKupnje,
                    kolicina: kolicina
                }
                var noviIznos = kolicina*cijenaKupnje;
                const logiranUser = window.localStorage.getItem('logirani');
                const user2 = JSON.parse(logiranUser);
                portfolioService.postaviToken(user2.token);
                portfolioService.dodajPortfolio(noviObjekt);
                alert("Transakcija je USPJEŠNO prošla :)");
                window.location='/portfolio';
            }
            

        })         

    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const noviPortfolio = (e) =>{
        e.preventDefault();
        const noviPortfelj={
            nazivKripto: nazivKripto,
            skraceniNaziv: skraceniNaziv,
            cijenaKupnje: cijenaKupnje,
            kolicina: kolicina,
        }
        portfolioService.dodajPortfolio(noviPortfelj).then((res)=>{
            window.location='/portfolio';
        })
    }
    
    const options=[];     
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
        
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=1&sparkline=false')
        .then(res=> {
            postaviCoins(res.data);
            
        }).catch(err => console.log("Error pri učitavanju") )
        coins.map(coin => {
            options.push({value: coin.current_price,
            label: coin.id 
            })
            postaviOpcije(options);
        })
        


    },[])
    useEffect(()=>{
        coins.map(coin => {
            options.push({value: coin.current_price,
            label: coin.id 
            })
            postaviOpcije(options);
        })
    },[refresh])
return(
    <>
    <NavBar/>
    {/* <div className="buyCrypto">
        <div className="menuTrade">
            <input className="button3" type="button" value="Buy" onClick={ucitajPodatke}/>
        </div>
            
            <div className="div-body">
                    <form className="form" onSubmit={handleSubmit} style={{visibility: gledanost}}>
                        <div class="title">Buy crypto</div>
                        <select className="selectBuy" id="selectLista" name="sveOpcije" options={opcije} onChange={promjeniDohvacenu}>
                            {opcije.map((option) => (
                            <option key={option.label} value={option.value} label={option.label}>{option.label}</option>
                            ))}
                        </select><br/>
                        <label id="idCrypto">{nazivKripto}</label><br/>
                        <label id="idPriceCrypto">{cijenaKupnje}</label>$
                        <br/><label for="kolicina" class="placeholder"></label>
                            Kolicina:
                            <input
                            name="kolicina"
                            type="number"
                            min={0}
                            value={kolicina}
                            onChange={e => setQuantity(e.target.value)}
                            required />
                        <br/>
                        <button className="button3" onClick={ucitajPodatke}>Kupi</button>
                    </form>
            </div>
                
    </div> */}
    {/* <br></br><div className="button2" onClick={ucitajPodatke}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Dohvati podatke</div> */}
        <input type="button" className="bn632-hover bn25" value="Dohvati podatke" onClick={ucitajPodatke}/>
    <div className="login-box">
            <h2>Buy Crypto</h2>
            <form onSubmit={handleSubmit} style={{visibility: gledanost}}>
                <select className="selectBuy" id="selectLista" name="sveOpcije" options={opcije} onChange={promjeniDohvacenu}>
                    {opcije.map((option) => (
                        <option key={option.label} value={option.value} label={option.label}>{option.label}</option>
                    ))}
                </select>
                <div className="user-box">
                    <label id="idCrypto">{nazivKripto}</label><br/>
                </div>
                <div className="user-box">
                    <label id="idPriceCrypto">{cijenaKupnje} $</label><br/>
                </div>
                <div className="user-box"><br/>
                    <label for="kolicina"></label>
                            Kolicina:
                            <input
                            name="kolicina"
                            type="number"
                            min={0}
                            value={kolicina}
                            onChange={e => setQuantity(e.target.value)}
                            required />
                </div>
                <div>
                    <a>
                    
                    <button onClick={ucitajPodatke}>Buy
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

