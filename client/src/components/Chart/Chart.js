import React from 'react';

import ChartType from './ChartType';
import { getData } from './utils';

import { TypeChooser } from 'react-stockcharts/lib/helper';
import { FoldingCube } from 'better-react-spinkit';
import './Chart.css';

class Chart extends React.Component {
  componentDidMount() {
    const { exchange, market, timespan } = this.props.options;

    getData(exchange, market, timespan).then(data => {
      this.setState({ data });
    });
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
    if (this.state == null) {
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
