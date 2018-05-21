import { tsvParse, csvParse } from 'd3-dsv';
import { timeParse } from 'd3-time-format';
import axios from 'axios';
import ccxt from 'ccxt';

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

const timeframeToMSHash = {
  '1m': 1000 * 60,
  '1h': 1000 * 60 * 60,
  '1M': 2629742 * 1000,
  '1y': 31556926 * 1000,
  '1d': 86400 * 1000,
};

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function getNewData(exchange, market) {
  exchange = new ccxt[exchange]({
    proxy: 'https://cors-anywhere.herokuapp.com/',
    enableRateLimit: true,
    rateLimit: 1000,
  });

  await sleep(exchange.rateLimit);

  let since = "'" + new Date().getTime() + "''";

  let payload = await exchange.fetchOHLCV(market, '1m', since, 1);

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

  return arrayObjs;
}

export async function getData(exchange, market, timespan) {
  // console.log(exchange, market, timespan, 'UTILS');

  exchange = new ccxt[exchange]({
    proxy: 'https://cors-anywhere.herokuapp.com/',
    enableRateLimit: true,
    rateLimit: 2000,
  });

  await sleep(exchange.rateLimit);

  let currentUTCMilliSeconds = new Date().getTime();

  let timeframeMS = timeframeToMSHash[timespan];

  let since = "'" + (currentUTCMilliSeconds - timeframeMS).toString() + "'";

  let payload = await exchange.fetchOHLCV(market, timespan, since, 1000);

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

  return arrayObjs;
}
