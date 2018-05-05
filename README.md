Because of a CORS access issue, I couldn't get access to Bitfinex public v1 api on localhost.

I opted to use v2 instead.

See: https://docs.bitfinex.com/v2/reference#rest-public-ticker


The User has the ability to trade either USD for BTC or BTC for USD.

There is a logic check to see if the user has enough USD or BTC to make the transaction.

If the user hasn't enough, an error will display.

The app uses Redux, Redux-thunk, SASS, axios, and is written in ES6.

Any questions? Reach out at cdtded1212@gmail.com
