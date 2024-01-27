"use client"
import React from 'react';

const OrderEntry = ({ order, type }) => {
  return (
    <div className={`order-entry ${type}`}>
      <span>{type === 'buy' ? 'Buy' : 'Sell'} {order.id}</span>
      <span>{order.price}</span>
      <span>{order.amount}</span>
      <span>{order.total}</span>
    </div>
  );
};

export default OrderEntry;
