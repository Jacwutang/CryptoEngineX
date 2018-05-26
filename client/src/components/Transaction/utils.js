const ccxt = require('ccxt');

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function getTrades(market, exchange, limit = 20) {
  exchange = new ccxt[exchange]({
    proxy: 'https://cors-anywhere.herokuapp.com/',
    timeout: 3000,
    enableRateLimit: true,
  });

  await sleep(exchange.rateLimit);

  let payload = await exchange.fetchTrades(market, undefined, limit);

  // [ {price,amount,side}, {}]

  return payload;
}
