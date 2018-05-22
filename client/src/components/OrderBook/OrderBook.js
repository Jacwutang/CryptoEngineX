import React, { Component } from 'react';
import './OrderBook.css';

import { getOrderData } from './utils';

class OrderBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bids: [],
      asks: [],
    };
  }

  componentDidMount() {
    const { market, exchange } = this.props;
    // getOrderData(market,exchange).then( (data) => {
    //
    // })

    getOrderData(market, exchange).then(payload =>
      this.setState({ bids: payload.bids, asks: payload.asks })
    );
  }

  renderOrderInformation() {
    return (
      <ul className="price-amt-ul">
        {' '}
        <li className="price-amt-item">
          {' '}
          <span> 123456 </span>
          <span> hahahaha </span>{' '}
        </li>
      </ul>
    );
  }

  render() {
    console.log(this.state);
    const { market, exchange } = this.props;
    return (
      <div className="order-book-wrapper">
        <div className="order-book-title"> Order Book - {market} </div>

        <div className="order-book-ask-bids">
          <span className="has-failure"> Asks </span>
          <span className="has-success"> Bids </span>
        </div>

        <div className="order-book-header">
          <div className="order-book-half">
            <span className="has-failure"> Price </span>
            <span className="has-failure"> Amount </span>
          </div>

          <div className="order-book-half">
            <span className="has-success"> Price </span>
            <span className="has-success"> Amount </span>
          </div>
        </div>

        <div className="price-amt-row">
          <ul className="price-amt-ul">
            {' '}
            {this.state.asks.map((ask, idx) => (
              <li key={idx} className="price-amt-item">
                {' '}
                <span> {ask[0]} </span>
                <span> {ask[1]} </span>{' '}
              </li>
            ))}
          </ul>

          <ul className="price-amt-ul">
            {' '}
            {this.state.bids.map((bid, idx) => (
              <li key={idx} className="price-amt-item">
                {' '}
                <span> {bid[0]} </span>
                <span> {bid[1]} </span>{' '}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default OrderBook;
