import {
  GET_MARKET_PRICE,
  ADD_USD_BALANCE,
  SUBTRACT_USD_BALANCE,
  ADD_BITCOIN_BALANCE,
  SUBTRACT_BITCOIN_BALANCE
} from "../constants/action-types";

export const getMarketPrice = price => ({
  type: GET_MARKET_PRICE,
  payload: price
});

export const addUSDBalance = newBalance => ({
  type: ADD_USD_BALANCE,
  payload: newBalance
});

export const subtractUSDBalance = newBalance => ({
  type: SUBTRACT_USD_BALANCE,
  payload: newBalance
});

export const addBitcoinBalance = newBalance => ({
  type: ADD_BITCOIN_BALANCE,
  payload: newBalance
});

export const subtractBitcoinBalance = newBalance => ({
  type: SUBTRACT_BITCOIN_BALANCE,
  payload: newBalance
});
