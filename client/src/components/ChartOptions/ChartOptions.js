import React, { Component } from 'react';
import './ChartOptions.css';
import { getMarketData } from './utils';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { FadingCircle } from 'better-react-spinkit';

import ChartOptionsMarket from './ChartOptionsMarket/ChartOptionsMarket';
import ChartOptionsTimespan from './ChartOptionsTimespan/ChartOptionsTimespan';

class ChartOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      market: this.props.market,
      exchange: this.props.exchange,
      timespan: this.props.timespan,
    };

    this.handleClick = this.handleClick.bind(this);
    this.receiveUpdateFromChild = this.receiveUpdateFromChild.bind(this);
  }

  receiveUpdateFromChild(field, value) {
    this.setState({ [field]: value }, () => {
      this.props.updateParent(field, value);
    });
  }

  handleClick(field) {
    return e => {
      let value = e.target.value;
      this.setState({ [field]: value }, () => {
        getMarketData(this.state[field]).then(markets => {
          //if a different exchange is selected, parent needs to be updated with exchange, and market.
          this.props.updateParent(field, value, 'market', markets[0]);
        });
      });
    };
  }

  render() {
    const { all_markets, market, exchange, timespan } = this.state;

    return (
      <div className="options-list">
        <div className="market-exchange">
          <ChartOptionsMarket
            exchange={exchange}
            updateParent={this.receiveUpdateFromChild}
            market={market}
          />
          <ul className="exchanges-list">
            <button
              onClick={this.handleClick('exchange')}
              ref="kraken"
              className="exchange-btn"
              value="kraken"
            >
              {' '}
              KRAKEN{' '}
            </button>
          </ul>

          <ChartOptionsTimespan
            timespan={timespan}
            updateParent={this.receiveUpdateFromChild}
          />
        </div>
      </div>
    );
  }
}

export default ChartOptions;
