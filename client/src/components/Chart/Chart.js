import React from 'react';

import ChartType from './ChartType';
import { getData, getNewData } from './utils';

import { TypeChooser } from 'react-stockcharts/lib/helper';
import { FoldingCube } from 'better-react-spinkit';
import './Chart.css';

class Chart extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { exchange, market, timespan } = this.props.options;

    getData(exchange, market, timespan).then(newData => {
      this.setState({ data: [...newData] }, () =>
        this.fetchData(exchange, market)
      );
    });
  }

  fetchData(exchange, market) {
    this.interval = setInterval(() => {
      getNewData(exchange, market).then(newData => {
        this.setState({ data: [...this.state.data, ...newData] });
      });
    }, 5000);
  }

  componentWillUnMount() {
    clearInterval(this.interval);
  }

  // componentWillReceiveProps(nextProps) {
  //   const { exchange, market, timespan } = this.props.options;
  //
  //   if (
  //     exchange !== nextProps.options.exchange ||
  //     market !== nextProps.options.market ||
  //     timespan !== nextProps.options.timespan
  //   ) {
  //     getData(
  //       nextProps.options.exchange,
  //       nextProps.options.market,
  //       nextProps.options.timespan
  //     );
  //   }
  // }

  render() {
    if (this.state.data.length === 0) {
      return (
        <div className="chart-spinner">
          {' '}
          <FoldingCube size={40} color="gray" />{' '}
        </div>
      );
    }

    return <ChartType type="hybrid" data={this.state.data} />;
  }
}

export default Chart;
