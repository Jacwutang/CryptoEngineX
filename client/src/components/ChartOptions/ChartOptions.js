import React, { Component } from 'react';
import './ChartOptions.css';
import { getMarketData } from './utils';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { FadingCircle } from 'better-react-spinkit';

class ChartOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      market: this.props.market,
      exchange: this.props.exchange,
      timespan: this.props.timespan,
      all_markets: [],
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // const { exchange } = this.state;
    // this.refs[exchange].classList.add('active');

    //Grab markets from default exchange.
    getMarketData(this.state.exchange).then(markets => {
      this.setState({ all_markets: [...markets] });
    });
  }

  updateParent(...args) {
    this.props.toggleOption(...args);
  }

  handleSelect(selectedOption) {
    let field = selectedOption.key;
    let value = selectedOption.value;

    //update select fields
    this.setState({ [field]: value }, () => {
      //update parent container with new timespan or market.
      this.updateParent(field, value);
    });
  }

  handleClick(field) {
    return e => {
      let value = e.target.value;
      this.setState({ [field]: value }, () => {
        getMarketData(this.state[field]).then(markets => {
          //if a different exchange is selected, parent needs to be updated with exchange, and market.
          this.updateParent(field, value, 'market', markets[0]);
        });
      });
    };
  }

  // handleChange(event, field) {
  //   if (field === 'exchange') {
  //     for (let ref in this.refs) {
  //       this.refs[ref].classList.remove('active');
  //     }
  //
  //     event.target.classList.add('active');
  //   }
  //
  //   //setState to change exchange.

  // }

  render() {
    const { all_markets, market, timespan } = this.state;

    return (
      <div className="options-list">
        <div className="market-exchange">
          <Select
            className="market-select"
            value={market}
            searchable={false}
            onChange={this.handleSelect}
            clearable={false}
            options={all_markets.map(market => {
              return {
                value: market,
                label: market,
                key: 'market',
              };
            })}
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
        </div>
        <Select
          className="timespan-select"
          value={timespan}
          searchable={false}
          clearable={false}
          onChange={this.handleSelect}
          options={[
            { value: '1m', label: '1m', key: 'timespan' },
            { value: '1h', label: '1h', key: 'timespan' },
            { value: '1d', label: '1d', key: 'timespan' },
            { value: '1M', label: '1M', key: 'timespan' },
          ]}
        />
      </div>
    );
  }
}

export default ChartOptions;
