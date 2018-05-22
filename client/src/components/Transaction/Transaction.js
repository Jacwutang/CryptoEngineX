import React, { Component } from 'react';
import './Transaction.css';
import OrderBook from '../OrderBook/OrderBook';
import { getTrades } from './utils';
class Transaction extends Component {
  constructor(props) {
    super(props);

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
        this.setState({ trades: payload });
      });
    }, 1000);
  }

  render() {
    const { market, exchange } = this.props;
    return (
      <div>
        <div className="transaction-header"> Trades </div>
        <ul className="ul-list">hey</ul>
      </div>
    );
  }
}
export default Transaction;
