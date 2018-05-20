import { tsvParse, csvParse } from 'd3-dsv';
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
//
// const parseDateTime = timeParse('%Y-%m-%d %H:%M:%S');
//
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

// const parseDateTime = timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
const parseDateTime = timeParse('%Q');

// function parseData(ticker) {
//   let d = {};
//   d.date = parseDateTime(ticker.datetime);
//   d.close = ticker.close;
//   d.high = ticker.high;
//   d.low = ticker.low;
//   d.volume = parseFloat(ticker.info.volume);
//
//   return d;
// }

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function getData() {
  let bitfinex = new ccxt.bitfinex({
    proxy: 'https://cors-anywhere.herokuapp.com/',
  });
  await bitfinex.loadMarkets();

  // console.log(bitfinex.markets['BTC/USDT']);

  await sleep(bitfinex.rateLimit);

  let payload = await bitfinex.fetchOHLCV(
    'BTC/USDT',
    '1d',
    '1417536000000',
    1000
  );

  // console.log(payload, 'payload');

  let arrayObjs = payload.map(array => {
    let obj = {};
    obj.date = parseDateTime(array[0]);
    obj.open = array[1];
    obj.high = array[2];
    obj.low = array[3];
    obj.close = array[4];
    obj.volume = array[5];

    return obj;
  });
  // by default the data arrives "in-order"
  // console.log(arrayObjs, 'pre-sort');

  // arrayObjs = arrayObjs.sort((a, b) => a.date.valueOf() - b.date.valueOf());
  //
  // console.log(arrayObjs, 'after-sort');

  // let markets = await bitfinex.loadMarkets();

  // let ticker = await bitfinex.fetchTicker('BTC/USDT');
  //
  // let parsedData = parseData(ticker);
  console.log(arrayObjs);
  return arrayObjs;
}
