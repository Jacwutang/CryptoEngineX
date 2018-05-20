import React, { Component } from 'react';
import axios from 'axios';
import Chart from '../Chart/Chart';
import TradeDisplay from '../TradeDisplay/TradeDisplay';
import './Main.css';

// https://crossorigin.me/
class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="main-wrapper">
        <Chart />
        <TradeDisplay />
      </div>
    );
  }
}

export default Main;
