"use client"
import React, { useState } from 'react';
import OrderBookData from '../orderbook-data/orderbookdata'; 
import "./orderbook.css";


const OrderBook = () => {
  const [marketQuantity, setMarketQuantity] = useState(100); 
  const [limitQuantity, setLimitQuantity] = useState(100);
  const [limitPrice, setLimitPrice] = useState(''); 
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]); 

  const handleMarketBuy = () => {
    const newBuyOrder = { id: Math.random(), content: `Q${marketQuantity} (Market)` };
    setBuyOrders(prevOrders => [...prevOrders, newBuyOrder]);
  };

  const handleMarketSell = () => {
    const newSellOrder = { id: Math.random(), content: `Q${marketQuantity} (Market)` };
    setSellOrders(prevOrders => [...prevOrders, newSellOrder]);
  };

  const handleLimitBuy = () => {
    const newBuyOrder = { 
      id: Math.random(), 
      content: `Q${limitQuantity} at $${limitPrice} (Limit)` 
    };
    setBuyOrders(prevOrders => [...prevOrders, newBuyOrder]);
  };

  const handleLimitSell = () => {
    const newSellOrder = { 
      id: Math.random(), 
      content: `Q${limitQuantity} at $${limitPrice} (Limit)` 
    };
    setSellOrders(prevOrders => [...prevOrders, newSellOrder]);
  };

  const handleMarketQuantityChange = (event) => {
    setMarketQuantity(event.target.value);
  };

  const handleLimitQuantityChange = (event) => {
    setLimitQuantity(event.target.value);
  };

  const handleLimitPriceChange = (event) => {
    setLimitPrice(event.target.value);
  };

  return (
    <>
      <div className="order-maker">
        <div className="title">
          <div className="price-all">
            <div>
              <h4>Current Price</h4>
            </div>
            <div>
              <span> $0.6969</span>
            </div>
          </div>
          <div className="market-limit-data">
            <div className="market-order">
              <div>Market Order</div>
              <div className='quantity-data-space'>
                Quantity
                <input 
                  type="number" 
                  value={marketQuantity} 
                  onChange={handleMarketQuantityChange} 
                />
              </div>
              <div className="buyandsell">
                <button className="buybutton" onClick={handleMarketBuy}>BUY</button>
                <button className="sellbutton" onClick={handleMarketSell}>SELL</button>
              </div>
            </div>
            <div className="limit-order">
              <div>Limit Order</div>
              <div className='quantity-data-space'>
                Quantity
                <input 
                  type="number" 
                  value={limitQuantity} 
                  onChange={handleLimitQuantityChange} 
                />
              </div>
              <div className='quantity-data-space'>
                Limit Price
                <input 
                  type="number" 
                  value={limitPrice} 
                  onChange={handleLimitPriceChange} 
                />
              </div>
              <div className="buyandsell">
                <button className="buybutton" onClick={handleLimitBuy}>BUY</button>
                <button className="sellbutton" onClick={handleLimitSell}>SELL</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderBookData buyOrders={buyOrders} sellOrders={sellOrders} />
    </>
  );
};

export default OrderBook;

