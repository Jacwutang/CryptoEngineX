const ccxt = require('ccxt');

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function getOrderData(market, exchange, limit = 5) {
  exchange = new ccxt[exchange]({
    proxy: 'https://cors-anywhere.herokuapp.com/',
    timeout: 10000,
    enableRateLimit: true,
  });

  await sleep(exchange.rateLimit);

  let payload = await exchange.fetchOrderBook(market, limit);

  // {
  //   bids: [ [price,amt], [price,amt]]
  //   asks: []
  // }
  // console.log(payload, 'payload');
  return payload;
}

export function randomIndex(length) {
  return Math.floor(Math.random() * length);
}
