import React, { Component } from 'react';
import axios from 'axios';
import Chart from '../Chart/Chart';
import OrderBook from '../OrderBook/OrderBook';
import ChartOptions from '../ChartOptions/ChartOptions';
import './Main.css';

// https://crossorigin.me/
class Main extends Component {
  constructor() {
    super();

    this.state = {
      exchange: 'kraken',
      market: 'BCH/EUR',
      timespan: '1d',
      loading: true,
    };

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  updateState(...args) {
    if (args.length === 2) {
      this.setState({ loading: true }, () => {
        this.setState({ [args[0]]: args[1] }, () => {
          this.setState({ loading: false });
        });
      });
    } else {
      this.setState({ loading: true }, () => {
        this.setState({ [args[0]]: args[1], [args[2]]: args[3] }, () => {
          this.setState({ loading: false });
        });
      });
    }
  }

  render() {
    if (this.state.loading === true) {
      return null;
    }

    const { exchange, market, timespan } = this.state;
    return (
      <div className="main-wrapper">
        <ChartOptions
          exchange={exchange}
          market={market}
          timespan={timespan}
          toggleOption={this.updateState}
        />
        <Chart options={this.state} />
        <OrderBook market={market} exchange={exchange} />
      </div>
    );
  }
}

export default Main;
