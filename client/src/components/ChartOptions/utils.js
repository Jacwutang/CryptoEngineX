const ccxt = require('ccxt');

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export async function getMarketData(exchange) {
  exchange = new ccxt[exchange]({
    proxy: 'https://cors-anywhere.herokuapp.com/',
    timeout: 10000,
    enableRateLimit: true,
  });

  await sleep(exchange.rateLimit);

  let markets = await exchange.loadMarkets();

  return Object.keys(markets);
}
