const ccxt = require('ccxt');

export async function getMarketData(exchange) {
  exchange = new ccxt[exchange]({
    proxy: 'https://cors-anywhere.herokuapp.com/',
  });

  let markets = await exchange.loadMarkets();

  return Object.keys(markets).slice(0, 7);
}
