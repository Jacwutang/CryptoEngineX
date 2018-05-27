import CandleStickChartForContinuousIntraDay from './CandleStickChartForContinuousIntraDay';
import updatingDataWrapper from './updatingDataWrapper';

const ChartWithUpdatingData = updatingDataWrapper(
  CandleStickChartForContinuousIntraDay
);

export default ChartWithUpdatingData;
