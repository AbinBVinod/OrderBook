// CoinPrice.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT";

const CoinPrice = ({ onPriceUpdate }) => {
  const [price, setPrice] = useState(null);

  const fetchPrice = () => {
    axios.get(url)
        .then(response => {
            const formattedPrice = parseFloat(response.data.price).toFixed(2);
            setPrice(formattedPrice);
            onPriceUpdate(formattedPrice); 
        })
        .catch(error => {
            console.error('Error fetching price:', error);
        });
  };

  useEffect(() => {
    fetchPrice(); 
    const intervalId = setInterval(fetchPrice, 1); 
    return () => clearInterval(intervalId); 
  }, []);

  return <div>{price}</div>;
};

export default CoinPrice;
