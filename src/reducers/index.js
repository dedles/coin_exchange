import {
  GET_MARKET_PRICE,
  SET_MARKET_PRICE,
  ADD_USD_BALANCE,
  SUBTRACT_USD_BALANCE,
  ADD_BITCOIN_BALANCE,
  SUBTRACT_BITCOIN_BALANCE
} from "../constants/action-types";

const initialState = {
  usdBalance: 156.12,
  bitcoinBalance: 0,
  marketPrice: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKET_PRICE:
      console.log("SET_MARKET_PRICE action: ", action)
      return Object.assign({}, state, {
        marketPrice: action.payload
      })
    case ADD_USD_BALANCE:
      return {...state, balance: usdBalance + action.payload}
    case SUBTRACT_USD_BALANCE:
      return {...state, balance: usdBalance - action.payload}
    case ADD_BITCOIN_BALANCE:
      return {...state, balance: bitcoinBalance + action.payload}
    case SUBTRACT_USD_BALANCE:
      return {...state, balance: bitcoinBalance - action.payload}
    default:
      return state;
  };
};

export default rootReducer;
