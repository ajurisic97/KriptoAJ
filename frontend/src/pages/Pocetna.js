import '../App.css';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Coina from '../components/Coin';
import NavBar from '../components/NavBar';
import { Nav } from 'react-bootstrap';
export default function Pocetna() {
    const [coins,postaviCoins] = useState([]);
    const [pretraga,postaviPretragu] = useState('');
    //const [fav, setFav] = useState(false);
    const [fav, setFav] = useState(false);

    // postavljam coinove s api od stranice:coingecko
    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=1&sparkline=false')
        .then(res=> {
            postaviCoins(res.data);
            //console.log(res.data);
        }).catch(err => console.log("Error pri učitavanju") )
    })
    const handleChange = e => {
        postaviPretragu(e.target.value);
    }
    const filtracija = coins.filter(coin => 
        coin.name.toLowerCase().includes(pretraga.toLowerCase())
    );
    return(
        <>
        <NavBar/>
        <div className="pocetna-sve">
            <div className="trazilica">
                <form>
                    <input type="text" placeholder="Pretrazi po imenu" className="coin-unos" onChange={handleChange}/>
                </form>
            </div>
            <div className='coin-container'>
                <div className='coin-row'>
                    <div className="coin">
                        <p>(Image)</p>
                        <h1>Cryptocurrency</h1>
                        <p className="coin-symbol">Short</p>
                    </div>
                    <div className="coin-data">
                        <p className="coin-price">Price</p>
                        <p className="coin-volume">Volume </p>
                        <p className="coin-percent">24h</p>
                        <p className="coin-marketcap">MarketCap </p>
                    </div>
                </div>
            </div>
            {filtracija.map(coin => {
                return(
                <Coina 
                image={coin.image}
                key={coin.id} 
                name={coin.name} 
                symbol={coin.symbol} 
                marketcap={coin.market_cap}
                price={coin.current_price} 
                volume={coin.total_volume}
                priceChange = {coin.price_change_percentage_24h}
                />
                
                )
                })
            }
        </div>
        
        </>
    )
}