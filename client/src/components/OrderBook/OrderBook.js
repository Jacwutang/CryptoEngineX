import React, { Component } from 'react';
import './OrderBook.css';

import { getOrderData, randomIndex } from './utils';

class OrderBook extends Component {
  constructor(props) {
    super(props);

    this.leftList = React.createRef();
    this.rightList = React.createRef();
    // this.list = React.createRef();

    this.state = {
      bids: [],
      asks: [],
    };

    this.interval = null;
  }

  componentDidMount() {
    const { market, exchange } = this.props;

    getOrderData(market, exchange).then(payload =>
      this.setState({ bids: payload.bids, asks: payload.asks }, () => {
        this.fetchSingleOrder(market, exchange, 1);
      })
    );
  }

  fetchSingleOrder(market, exchange, limit) {
    const { bids, asks } = this.state;
    this.interval = setInterval(() => {
      getOrderData(market, exchange, limit).then(payload => {
        if (this.interval) {
          this.setState({
            bids: bids.concat(payload.bids),
            asks: asks.concat(payload.asks),
          });
        }
      });
    }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    const { market, exchange } = this.props;
    let randomAskIndex = randomIndex(this.state.asks.length);
    let randomBidIndex = randomIndex(this.state.bids.length);

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
          <ul className="price-amt-ul" ref={this.leftList}>
            {this.state.asks.map((ask, idx) => {
              let list = this.leftList.current;
              if (
                idx > randomAskIndex &&
                list !== null &&
                list.children.length > 0
              ) {
                let li = list.children[randomAskIndex];

                li.classList.add('item-ask');
                setTimeout(() => {
                  li.classList.remove('item-ask');
                }, 1000);
              }

              return (
                <li key={idx} className="price-amt-item">
                  {' '}
                  <span> {ask[0]} </span>
                  <span> {ask[1]} </span>{' '}
                </li>
              );
            })}
          </ul>

          <ul className="price-amt-ul" ref={this.rightList}>
            {this.state.bids.map((bid, idx) => {
              let list = this.rightList.current;
              if (
                idx > randomBidIndex &&
                list !== null &&
                list.children.length > 0
              ) {
                let li = list.children[randomBidIndex];

                li.classList.add(`item-bid`);
                setTimeout(() => {
                  li.classList.remove(`item-bid`);
                }, 2000);
              }
              return (
                <li key={idx} className="price-amt-item">
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
