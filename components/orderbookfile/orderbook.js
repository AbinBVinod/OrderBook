"use client"
import React, { useEffect, useState } from "react";
import OrderBookData from "../orderbook-data/orderbookdata";
import "./orderbook.css";
import CoinPrice from "@/db/Api/priceaction";

const OrderBook = () => {
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [executedTrades, setExecutedTrades] = useState([]);
  const [marketQuantity, setMarketQuantity] = useState(100);
  const [limitQuantity, setLimitQuantity] = useState(100);
  const [limitPrice, setLimitPrice] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  const handlePriceUpdate = (newPrice) => {
    setCurrentPrice(newPrice);
  };

  const sendOrderDataToServer = async (orderData) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Order data could not be saved.');
      }
    } catch (error) {
      console.error('Error sending order data:', error);
    }
  };

  const handleExecutedTrade = (type, quantity, price, orderType) => {
    const newTrade = {
      id: Math.random(),
      type,
      content: `Owner: ${ownerName}, Q${quantity} at $${price} (${orderType})`,
    };
    setExecutedTrades((prevTrades) => [newTrade, ...prevTrades]);


    const orderData = {
      quantity,
      filledQuantity: quantity, 
      price,
      side: type === "buy" ? "buy" : "sell",
      type: orderType === "Market" ? "market" : "limit",
      owner: ownerName,
      status: 1, 
      time: new Date(),
    };

    
    sendOrderDataToServer(orderData);
  };

  const handleMarketBuy = () => {
    const orderContent = `Owner: ${ownerName}, Q${marketQuantity} at $${currentPrice} (Market)`;
    setBuyOrders((prevOrders) => [
      ...prevOrders,
      { id: Math.random(), content: orderContent },
    ]);
    handleExecutedTrade("buy", marketQuantity, currentPrice, "Market");
  };

  const handleMarketSell = () => {
    const orderContent = `Owner: ${ownerName}, Q${marketQuantity} at $${currentPrice} (Market)`;
    setSellOrders((prevOrders) => [
      ...prevOrders,
      { id: Math.random(), content: orderContent },
    ]);
    handleExecutedTrade("sell", marketQuantity, currentPrice, "Market");
  };

  const handleLimitBuy = () => {
    const orderContent = `Owner: ${ownerName}, Q${limitQuantity} at $${limitPrice} (Limit)`;
    setBuyOrders((prevOrders) => [
      ...prevOrders,
      { id: Math.random(), content: orderContent },
    ]);
    handleExecutedTrade("buy", limitQuantity, limitPrice, "Limit");
  };

  const handleLimitSell = () => {
    const orderContent = `Owner: ${ownerName}, Q${limitQuantity} at $${limitPrice} (Limit)`;
    setSellOrders((prevOrders) => [
      ...prevOrders,
      { id: Math.random(), content: orderContent },
    ]);
    handleExecutedTrade("sell", limitQuantity, limitPrice, "Limit");
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

  const handleOwnerNameChange = (event) => {
    setOwnerName(event.target.value);
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
              <span>
                {" "}
                <CoinPrice onPriceUpdate={handlePriceUpdate} />
              </span>
            </div>
          </div>
          <div className="owner-input">
            Owner Name:
            <input
              type="text"
              value={ownerName}
              onChange={handleOwnerNameChange}
            />
          </div>
          <div className="market-limit-data">
            <div className="market-order">
              <div>Market Order</div>
              <div className="quantity-data-space">
                Quantity
                <input
                  type="number"
                  value={marketQuantity}
                  onChange={handleMarketQuantityChange}
                />
              </div>
              <div className="buyandsell">
                <button className="buybutton" onClick={handleMarketBuy}>
                  BUY
                </button>
                <button className="sellbutton" onClick={handleMarketSell}>
                  SELL
                </button>
              </div>
            </div>
            <div className="limit-order">
              <div>Limit Order</div>
              <div className="quantity-data-space">
                Quantity
                <input
                  type="number"
                  value={limitQuantity}
                  onChange={handleLimitQuantityChange}
                />
              </div>
              <div className="quantity-data-space">
                Limit Price
                <input
                  type="number"
                  value={limitPrice}
                  onChange={handleLimitPriceChange}
                />
              </div>
              <div className="buyandsell">
                <button className="buybutton" onClick={handleLimitBuy}>
                  BUY
                </button>
                <button className="sellbutton" onClick={handleLimitSell}>
                  SELL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderBookData
        buyOrders={buyOrders}
        sellOrders={sellOrders}
        executedTrades={executedTrades}
      />
    </>
  );
};

export default OrderBook;
