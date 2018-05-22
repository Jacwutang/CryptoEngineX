import React, { Component } from 'react';
import './Transaction.css';
import OrderBook from '../OrderBook/OrderBook';
import { getTrades } from './utils';
class Transaction extends Component {
  constructor(props) {
    super(props);

    this.item = React.createRef();

    this.state = {
      isMounted: false,
      trades: [],
    };
  }

  async componentDidMount() {
    const { market, exchange } = this.props;

    let payload = await getTrades(market, exchange);

    this.setState({ isMounted: true, trades: payload }, () => {
      if (this.state.isMounted) {
        this.fetchData(market, exchange);
      }
    });
  }

  componentWillUnMount() {
    clearInterval(this.interval);
    this.setState({ isMounted: false });
  }

  fetchData(market, exchange) {
    this.interval = setInterval(() => {
      getTrades(market, exchange, 1).then(payload => {
        this.setState({ trades: [...this.state.trades.slice(1), ...payload] });
      });
    }, 5000);
  }

  render() {
    const { market, exchange } = this.props;
    const { trades } = this.state;
    return (
      <div>
        <div className="transaction-header"> Trades </div>
        <ul className="ul-list">
          {trades.map((trade, idx) => {
            let tradeType =
              trade.side === 'buy' ? 'has-success' : 'has-failure';

            if (idx === trades.length - 1) {
              let item = this.item.current;
              if (item !== null) {
                item.classList.add(`trade-active-${trade.side}`);
                setInterval(() => {
                  item.classList.remove(`trade-active-${trade.side}`);
                }, 2500);
              }
            }
            return (
              <li className="list-item" key={idx} ref={this.item}>
                <span className={tradeType}>{trade.side} </span>
                <span>{trade.price} </span>
                <span>{trade.amount} </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default Transaction;
