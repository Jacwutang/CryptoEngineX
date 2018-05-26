import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { getMarketData } from '../utils';
import { FadingCircle } from 'better-react-spinkit';

class ChartOptionsMarket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marketsList: [],
      market: this.props.market,
      loading: true,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    // const { exchange } = this.state;
    // this.refs[exchange].classList.add('active');

    //Grab markets from default exchange.
    getMarketData(this.props.exchange).then(markets => {
      this.setState({ marketsList: [...markets], loading: false });
    });
  }

  handleSelect(selectedOption) {
    let field = selectedOption.key;
    let value = selectedOption.value;

    //update select fields
    this.setState({ [field]: value }, () => {
      //update parent container with new timespan or market.

      this.props.updateParent(field, value);
    });
  }

  render() {
    const { market, marketsList } = this.state;
    if (this.state.loading) {
      return (
        <div className="chart-spinner">
          {' '}
          <FadingCircle size={40} color="gray" />
        </div>
      );
    }
    return (
      <Select
        className="market-select"
        value={market}
        searchable={false}
        onChange={this.handleSelect}
        clearable={false}
        options={marketsList.map(market => {
          return {
            value: market,
            label: market,
            key: 'market',
          };
        })}
      />
    );
  }
}

export default ChartOptionsMarket;

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
