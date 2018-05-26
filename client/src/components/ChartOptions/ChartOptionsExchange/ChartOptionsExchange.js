import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { getMarketData } from '../utils';
import { FadingCircle } from 'better-react-spinkit';

class ChartOptionsExchange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchangesList: this.props.exchanges,
      exchange: this.props.exchanges[0],
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedOption) {
    let field = selectedOption.key;
    let value = selectedOption.value;

    //update select fields
    this.setState({ [field]: value }, () => {
      //update parent container with new timespan or market.
      getMarketData(this.state[field]).then(markets => {
        //if a different exchange is selected, parent needs to be updated with exchange, and market.
        this.props.updateParent(field, value, 'market', markets[0]);
      });
    });
  }

  render() {
    const { exchange, exchangesList } = this.state;

    if (this.state.loading) {
      return (
        <div className="chart-spinner">
          {' '}
          <FadingCircle size={40} color="gray" />
        </div>
      );
    }
    return (
      <ul className="exchanges-list">
        <Select
          className="exchange-select"
          value={exchange}
          searchable={false}
          onChange={this.handleSelect}
          clearable={false}
          options={exchangesList.map(exchange => {
            return {
              value: exchange,
              label: exchange.toUpperCase(),
              key: 'exchange',
            };
          })}
        />
      </ul>
    );
  }
}

export default ChartOptionsExchange;
