const ccxt = require('ccxt');

export async function getMarketData(exchange) {
  exchange = new ccxt[exchange]({
    proxy: 'https://cors-anywhere.herokuapp.com/',
    timeout: 10000,
  });

  let markets = await exchange.loadMarkets();

  return Object.keys(markets);
}
