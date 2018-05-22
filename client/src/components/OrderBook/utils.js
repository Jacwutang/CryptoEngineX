const ccxt = require('ccxt');

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function getOrderData(market, exchange) {
  exchange = new ccxt[exchange]({
    proxy: 'https://cors-anywhere.herokuapp.com/',
  });

  await sleep(exchange.rateLimit);
  let limit = 5;

  let payload = await exchange.fetchOrderBook(market, 5);

  // {
  //   bids: [ [price,amt], [price,amt]]
  //   asks: []
  // }

  return payload;
}
