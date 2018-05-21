import React, { Component } from 'react';
import './ChartOptions.css';

class ChartOptions extends Component {
  constructor() {
    super();

    this.state = {
      market: 'BTC/USDT',
      exchange: 'BITFINEX',
      timespan: 1000 * 60,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.refs.btn1.classList.add('active');
  }

  handleChange(event, field) {
    if (field === 'exchange') {
      for (let ref in this.refs) {
        this.refs[ref].classList.remove('active');
      }

      event.target.classList.add('active');
    }

    this.setState({ [field]: event.target.value });
  }

  render() {
    console.log(this.state);

    return (
      <div className="options-list">
        <div className="market-exchange">
          <select
            value={this.state.market}
            onChange={e => this.handleChange(e, 'market')}
          >
            <option selected value="BTC/USDT">
              BTC/USD
            </option>
            <option value="BTC/EUR">BTC/EUR</option>
            <option value="BTC/GBP">BTC/GBP</option>
            <option value="ETH/USDT">ETH/USD</option>
            <option value="ETH/EUR">ETH/EUR</option>
            <option value="ETH/GBP">ETH/GBP</option>
          </select>
          <ul className="exchanges-list">
            <button
              onClick={e => this.handleChange(e, 'exchange')}
              ref="btn1"
              className="exchange-btn"
              value="BITFINEX"
            >
              {' '}
              BITFINEX{' '}
            </button>
            <button
              onClick={e => this.handleChange(e, 'exchange')}
              ref="btn2"
              className="exchange-btn"
              value="GDAX"
            >
              {' '}
              GDAX{' '}
            </button>
          </ul>
        </div>

        <select
          value={this.state.timespan}
          onChange={e => this.handleChange(e, 'timespan')}
        >
          <option selected value="{1000*60}">
            1m
          </option>
          <option value={1000 * 60 * 5}>5m</option>
          <option value={1000 * 60 * 15}>15m</option>
          <option value={1000 * 60 * 60}>1h</option>
          <option value={1000 * 60 * 60 * 24}>1d</option>
          <option value={2629743}>1m</option>
        </select>
      </div>
    );
  }
}

export default ChartOptions;
