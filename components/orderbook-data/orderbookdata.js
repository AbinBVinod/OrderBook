"use client"

import React from 'react';
import "./orderbookdata.css";

const OrderBookData = ({ buyOrders = [], sellOrders = [] }) => {
  if (buyOrders.length === 0 && sellOrders.length === 0) {
    return null;
  }

  return (
    <div className="order-data-all">
      <h1>Order-Book</h1>
      <div className="order-buy-sell-all">
        <div className="buy-order-book">
          <h2>BUY</h2>
          {buyOrders.map(order => (
            <div key={order.id} className="order-entry buy">{order.content}</div>
          ))}
        </div>
        <div className="sell-order-book">
          <h2>SELL</h2>
          {sellOrders.map(order => (
            <div key={order.id} className="order-entry sell">{order.content}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBookData;


