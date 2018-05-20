import React from 'react';
import { render } from 'react-dom';
import ChartType from './ChartType';
import { getData } from './utils';

import { TypeChooser } from 'react-stockcharts/lib/helper';

class Chart extends React.Component {
  componentDidMount() {
    // getData().then(data => {
    //   console.log('DATA', data);
    //   this.setState({ data });
    // });
    getData();
  }

  // async componentDidMount() {
  //   let bitfinex = new ccxt.bitfinex({
  //     proxy: 'https://cors-anywhere.herokuapp.com/',
  //   });
  //   let markets = await bitfinex.loadMarkets();
  //   console.log(await bitfinex.fetchTicker('BTC/USDT'), 'first');
  // }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <TypeChooser>
        {type => <ChartType type={type} data={this.state.data} />}
      </TypeChooser>
    );
  }
}

export default Chart;
