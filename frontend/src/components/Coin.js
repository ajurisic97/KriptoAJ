import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {MdFavorite, MdFavoriteBorder} from 'react-icons/md';

function favorit(){
    console.log("Dodano u favorite");
}
export default function Coin({image,name,symbol,price,volume,priceChange,marketcap}) {
    return(
    <div className='coin-container'>
        <div className='coin-row'>
            <div className="coin">
                <Link onClick={favorit} to="/">
                    <MdFavoriteBorder/>
                </Link>
                <img src={image} alt='crypto'/>
                <h1>{name}</h1>
                <p className="coin-symbol">{symbol}</p>
            </div>
            <div className="coin-data">
                <p className="coin-price">{price}$</p>
                <p className="coin-volume">{volume.toLocaleString()}$ </p>
                {priceChange < 0 ? (
                    <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
                ) : (<p className="coin-percent green">{priceChange.toFixed(2)}%</p>)
                }
            <p className="coin-marketcap">{marketcap.toLocaleString()}$ </p>
            
            </div>
        </div>
    </div>);
}