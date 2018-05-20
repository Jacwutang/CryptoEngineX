import React from 'react';

import ChartType from './ChartType';
import { getData } from './utils';

import { TypeChooser } from 'react-stockcharts/lib/helper';

class Chart extends React.Component {
  componentDidMount() {
    getData().then(data => {
      console.log('DATA', data);

      this.setState({ data });
    });
  }

  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }

    console.log(this.state.data, 'state data');

    return (
      <TypeChooser>
        {type => <ChartType type={type} data={this.state.data} />}
      </TypeChooser>
    );
  }
}

export default Chart;
