import React from 'react';
import './tradessection.css'; // You'll need to create this

const TradesSection = ({ trades }) => {
  return (
    <div className="trades-section">
      <h2>Trades</h2>
      <div className="trades-list">
        {trades.map(trade => (
          <div key={trade.id} className={`trade ${trade.type}`}>
            <span>{trade.timestamp.toLocaleTimeString()}</span>
            <span>{trade.quantity}</span>
            <span>${trade.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradesSection;
