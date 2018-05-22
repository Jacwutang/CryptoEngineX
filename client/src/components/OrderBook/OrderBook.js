import React, { Component } from 'react';
import './OrderBook.css';

import { getOrderData } from './utils';

class OrderBook extends Component {
  constructor(props) {
    super(props);

    this.leftItem = React.createRef();
    this.rightItem = React.createRef();

    this.state = {
      bids: [],
      asks: [],
    };
  }

  componentDidMount() {
    const { market, exchange } = this.props;

    getOrderData(market, exchange).then(payload =>
      this.setState({ bids: payload.bids, asks: payload.asks }, () => {
        this.fetchData(market, exchange, 1);
      })
    );
  }

  fetchData(market, exchange, limit) {
    const { bids, asks } = this.state;
    this.interval = setInterval(() => {
      getOrderData(market, exchange, limit).then(payload => {
        this.setState({
          bids: bids.concat(payload.bids),
          asks: asks.concat(payload.asks),
        });
      });
    }, 1000);
  }

  componentWillUnMount() {
    clearInterval(this.interval);
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
            {this.state.asks.map((ask, idx) => {
              let item = this.leftItem.current;
              if (idx === this.state.asks.length - 1 && item !== null) {
                item.classList.add(`item-ask`);
                setTimeout(() => {
                  item.classList.remove(`item-ask`);
                }, 1000);
              }

              return (
                <li key={idx} className="price-amt-item" ref={this.leftItem}>
                  {' '}
                  <span> {ask[0]} </span>
                  <span> {ask[1]} </span>{' '}
                </li>
              );
            })}
          </ul>

          <ul className="price-amt-ul">
            {' '}
            {this.state.bids.map((bid, idx) => {
              let item = this.rightItem.current;
              if (idx === this.state.bids.length - 1 && item !== null) {
                item.classList.add(`item-bid`);
                setTimeout(() => {
                  item.classList.remove(`item-bid`);
                }, 2500);
              }
              return (
                <li key={idx} className="price-amt-item" ref={this.rightItem}>
                  {' '}
                  <span> {bid[0]} </span>
                  <span> {bid[1]} </span>{' '}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default OrderBook;
