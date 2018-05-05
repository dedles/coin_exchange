import axios from "axios";

import {
  GET_MARKET_PRICE,
  SET_MARKET_PRICE,
  BUY_BITCOIN,
  BUY_DOLLARS
} from "../constants/action-types";

export function getMarketPrice(){
  return dispatch => {
    return axios.get("https://api.bitfinex.com/v2/ticker/tBTCUSD").then((response) => {
      const lastPrice = response.data[6]
      dispatch(setMarketPrice(lastPrice))
    })
  }
};


export const setMarketPrice = price => ({
  type: SET_MARKET_PRICE,
  payload: price
})


export const buyBitcoin = amount => ({
  type: BUY_BITCOIN,
  payload: amount
})

export const buyDollars = amount => ({
  type: BUY_DOLLARS,
  payload: amount
})
