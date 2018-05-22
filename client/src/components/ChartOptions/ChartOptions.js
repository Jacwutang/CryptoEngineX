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

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { exchange } = this.state;
    this.refs[exchange].classList.add('active');

    //Grab default markets from default exchange.
    getMarketData(this.state.exchange).then(markets => {
      this.setState({ all_markets: [...markets] });
    });
  }

  updateParent(...args) {
    this.props.toggleOption(...args);
  }

  handleChange(event, field) {
    if (field === 'exchange') {
      for (let ref in this.refs) {
        this.refs[ref].classList.remove('active');
      }

      event.target.classList.add('active');
    }

    //setState to change exchange.
    this.setState({ [field]: event.target.value }, () => {
      getMarketData(this.state.exchange).then(markets => {
        this.setState({ all_markets: markets, market: markets[0] }, () => {
          this.updateParent(
            'exchange',
            this.state.exchange,
            'market',
            markets[0]
          );
        });
      });
    });
  }

  handleSelectChange = selectedOption => {
    let field = selectedOption.labelKey;
    this.setState({ [field]: selectedOption.value }, () => {
      this.updateParent(field, selectedOption.value);
    });
  };

  render() {
    const { all_markets } = this.state;

    return (
      <div className="options-list">
        <div className="market-exchange">
          <Select
            className="market-select"
            value={this.state.market}
            onChange={this.handleSelectChange}
            searchable={false}
            clearable={false}
            options={all_markets.map(market => {
              return {
                value: market,
                label: market,
                labelKey: 'market',
              };
            })}
          />

          <ul className="exchanges-list">
            <button
              onClick={e => this.handleChange(e, 'exchange')}
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
          value={this.state.timespan}
          onChange={this.handleSelectChange}
          searchable={false}
          clearable={false}
          options={[
            { value: '1m', label: '1m', labelKey: 'timespan' },
            { value: '1h', label: '1h', labelKey: 'timespan' },
            { value: '1d', label: '1d', labelKey: 'timespan' },
            { value: '1M', label: '1M', labelKey: 'timespan' },
          ]}
        />
      </div>
    );
  }
}

export default ChartOptions;
