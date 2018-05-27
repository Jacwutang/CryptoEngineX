import React from 'react';
import PropTypes from 'prop-types';

import { scaleTime } from 'd3-scale';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';

import { OHLCTooltip } from 'react-stockcharts/lib/tooltip';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { last } from 'react-stockcharts/lib/utils';

import './ChartType.css';

class CandleStickChartForContinuousIntraDay extends React.Component {
  render() {
    const { type, data, width, ratio } = this.props;
    // console.log('chart-type-data', data);

    const xAccessor = d => {
      // console.log(d.date, 'd param');
      return d.date;
    };
    const start = xAccessor(last(data));
    // console.log(start, 'start');
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    // console.log(end, 'end');
    const xExtents = [start, end];

    return (
      <ChartCanvas
        height={400}
        ratio={ratio}
        width={width}
        type={type}
        margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
        seriesName="MSFT"
        data={data}
        xScale={scaleTime()}
        xAccessor={xAccessor}
        xExtents={xExtents}
      >
        <Chart
          id={2}
          yExtents={[d => d.volume]}
          height={150}
          origin={(w, h) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format('.0s')}
            tickStroke="#dee5ed"
          />

          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format('.4s')}
          />

          <BarSeries
            yAccessor={d => d.volume}
            fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
          />

          <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />
        </Chart>
        <Chart
          id={1}
          yExtents={[d => [d.high, d.low]]}
          padding={{ top: 40, bottom: 20 }}
        >
          <YAxis axisAt="right" orient="right" ticks={5} tickStroke="#dee5ed" />

          <MouseCoordinateX
            rectWidth={60}
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat('%H:%M:%S')}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')}
          />

          <CandlestickSeries />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={d => d.close}
            fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
          />

          <OHLCTooltip
            origin={[-40, 0]}
            xDisplayFormat={timeFormat('%Y-%m-%d %H:%M:%S')}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

CandleStickChartForContinuousIntraDay.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
};

CandleStickChartForContinuousIntraDay.defaultProps = {
  type: 'svg',
};
CandleStickChartForContinuousIntraDay = fitWidth(
  CandleStickChartForContinuousIntraDay
);

export default CandleStickChartForContinuousIntraDay;

// <EdgeIndicator
//   itemType="first"
//   orient="left"
//   edgeAt="left"
//   yAccessor={d => d.volume}
//   displayFormat={format('.4s')}
//   fill="#0F0F0F"
// />
// <EdgeIndicator
//   itemType="last"
//   orient="right"
//   edgeAt="right"
//   yAccessor={d => d.volume}
//   displayFormat={format('.4s')}
//   fill="#0F0F0F"
// />
//
// <XAxis
//   axisAt="bottom"
//   orient="bottom"
//   tickStroke="#dee5ed"
//   stroke="#dee5ed"
// />
