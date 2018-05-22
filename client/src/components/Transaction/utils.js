const ccxt = require('ccxt');

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function getTrades(market, exchange, limit = 15) {
  exchange = new ccxt[exchange]({
    proxy: 'https://cors-anywhere.herokuapp.com/',
    timeout: 10000,
  });

  await sleep(exchange.rateLimit);
  // async fetchTrades (symbol, since = undefined, limit = undefined, params = {})
  // let since = "'" + new Date().getTime() + "''";
  let payload = await exchange.fetchTrades(market, undefined, limit);

  // console.log('payload', payload);

  // [ {price,amount,side}, {}]

  return payload;
}
