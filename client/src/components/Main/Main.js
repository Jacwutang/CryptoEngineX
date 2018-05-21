import React, { Component } from 'react';
import axios from 'axios';
import Chart from '../Chart/Chart';
import TradeDisplay from '../TradeDisplay/TradeDisplay';
import ChartOptions from '../ChartOptions/ChartOptions';
import './Main.css';

// https://crossorigin.me/
class Main extends Component {
  constructor() {
    super();

    this.state = {
      exchange: '',
      market: '',
      timespan: '',
    };
  }

  handleClick() {}

  render() {
    return (
      <div className="main-wrapper">
        <ChartOptions />
        <Chart options={this.state} />
        <TradeDisplay />
      </div>
    );
  }
}

export default Main;
