import React, { Component } from 'react';
import './TradeDisplay.css';
import OrderBook from '../OrderBook/OrderBook';

class TradeDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { market } = this.props;
    return (
      <div className="trade-display-container">
        <div className="order-book-info">Order Book - {market} </div>
        <div className="ask-bids">
          <OrderBook type="Asks" />

          <OrderBook type="Bids" />
        </div>
      </div>
    );
  }
}
export default TradeDisplay;
