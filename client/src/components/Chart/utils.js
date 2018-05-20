// import { tsvParse, csvParse } from 'd3-dsv';
import { timeParse } from 'd3-time-format';
import axios from 'axios';
import ccxt from 'ccxt';
// function parseData(parse) {
//   return function(d) {
//     d.date = parse(d.date);
//     d.open = +d.open;
//     d.high = +d.high;
//     d.low = +d.low;
//     d.close = +d.close;
//     d.volume = +d.volume;
//
//     return d;
//   };
// }

const parseDateTime = timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
// %Y-%m-%dT%H:%M:%SZ

// export function getData() {
//   const promiseIntraDayContinuous = fetch(
//     '//rrag.github.io/react-stockcharts/data/bitfinex_xbtusd_1m.csv'
//   )
//     .then(response => response.text())
//     .then(data => csvParse(data, parseData(parseDateTime)))
//     .then(data => {
//       data.sort((a, b) => {
//         return a.date.valueOf() - b.date.valueOf();
//       });
//       return data;
//     });
//   return promiseIntraDayContinuous;
// }

function parseData(ticker) {
  let d = {};
  d.date = parseDateTime(ticker.datetime);
  d.close = ticker.close;
  d.high = ticker.high;
  d.low = ticker.low;
  d.volume = ticker.info.volume;

  return d;
}

export async function getData() {
  let bitfinex = new ccxt.bitfinex({
    proxy: 'https://cors-anywhere.herokuapp.com/',
  });
  let markets = await bitfinex.loadMarkets();

  let ticker = await bitfinex.fetchTicker('BTC/USDT');
  console.log(ticker);

  let parsedData = parseData(ticker);
  console.log(parsedData);
}
