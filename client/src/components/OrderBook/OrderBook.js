import React, { Component } from 'react';
import './OrderBook.css';

import { getOrderData } from './utils';

class OrderBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: [],
      amount: [],
    };
  }

  componentDidMount() {
    const { market, exchange } = this.props;
    // getOrderData(market,exchange).then( (data) => {
    //
    // })

    getOrderData(market, exchange);
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
            <li className="price-amt-item">
              {' '}
              <span> 123456 </span>
              <span> hahahaha </span>{' '}
            </li>
          </ul>

          <ul className="price-amt-ul">
            {' '}
            <li className="price-amt-item">
              {' '}
              <span> 78910 </span>
              <span> lololol </span>{' '}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default OrderBook;
