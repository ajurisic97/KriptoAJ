import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Coin from '../components/Coin';

test('rendering coin ', () => {
  const coin = {
    name:"TestCOIN",
    symbol:"TCN",
    market_cap:150000,
    current_price:100,
    total_volume:140000,
    price_change_percentage_24h : 5,

  };
  const component = render(<Coin image={coin.image}
    
    name={coin.name} 
    symbol={coin.symbol} 
    marketcap={coin.market_cap}
    price={coin.current_price} 
    volume={coin.total_volume}
    priceChange = {coin.price_change_percentage_24h} />);

  expect(component).toHaveTextContent('TestCOIN');
});