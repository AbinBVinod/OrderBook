"use client";
import React from "react";
import "./orderbookdata.css";

const OrderBookData = ({
  buyOrders = [],
  sellOrders = [],
  executedTrades = [],
}) => {
  if (buyOrders.length === 0 && sellOrders.length === 0) {
    return null;
  }

  return (
    <div className="order-data-all">
      <h1>Order-Book</h1>
      <div className="orderbook-and-trade">
        <div className="order-buy-sell-all">
          <div className="buy-order-book">
            <h2>BUY</h2>
            {buyOrders.map((order) => (
              <div key={order.id} className="order-entry buy">
                {order.content}
              </div>
            ))}
          </div>
          <div className="sell-order-book">
            <h2>SELL</h2>
            {sellOrders.map((order) => (
              <div key={order.id} className="order-entry sell">
                {order.content}
              </div>
            ))}
          </div>
        </div>
        <div className="executed-trades">
          <h1>Executed Trades</h1>
          {executedTrades.map((trade, index) => (
            <div
              key={index}
              className={`order-entry ${
                trade.type === "buy" ? "order-entry-buy" : "order-entry-sell"
              }`}
            >
              {trade.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBookData;
