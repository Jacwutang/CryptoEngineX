import React from 'react';

// import ChartWithUpdatingData from './ChartWrapper';
import CandleStickChartForContinuousIntraDay from './CandleStickChartForContinuousIntraDay';
import { getData, getNewData } from './utils';

import { TypeChooser } from 'react-stockcharts/lib/helper';
import { FoldingCube } from 'better-react-spinkit';
import './Chart.css';

class Chart extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      loading: true,
    };

    this.interval = null;
  }

  componentDidMount() {
    const { exchange, market, timespan } = this.props.options;

    getData(exchange, market, timespan).then(data => {
      this.setState({ data: [...data], loading: false }, () => {
        this.fetchData(exchange, market);
      });
    });
  }

  fetchData(exchange, market) {
    this.interval = setInterval(() => {
      getNewData(exchange, market).then(newData => {
        let sorted = this.state.data
          .concat(newData)
          .sort((a, b) => a.date.valueOf() - b.date.valueOf());
        if (this.interval) {
          this.setState({ data: sorted });
        }
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="chart-spinner">
          {' '}
          <FoldingCube size={40} color="gray" />{' '}
        </div>
      );
    }

    return (
      <CandleStickChartForContinuousIntraDay
        type="hybrid"
        data={this.state.data}
      />
    );
  }
}

export default Chart;
