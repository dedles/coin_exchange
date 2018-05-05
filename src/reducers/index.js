import {
  ADD_ARTICLE,
  GET_MARKET_PRICE,
  ADD_USD_BALANCE,
  SUBTRACT_USD_BALANCE
} from "../constants/action-types";

const initialState = {
  usdBalance: 156.12,
  bitcoinBalance: 0,
  marketPrice: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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