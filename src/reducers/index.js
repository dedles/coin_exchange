import {
  GET_MARKET_PRICE,
  SET_MARKET_PRICE,
  BUY_BITCOIN,
  BUY_DOLLARS
} from "../constants/action-types";

const initialState = {
  usdBalance: 156.12,
  bitcoinBalance: 0.20000000,
  marketPrice: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKET_PRICE:
      return Object.assign({}, state, {
        marketPrice: action.payload
      })
    case BUY_BITCOIN:
      return Object.assign({}, state, {
        usdBalance: Number((state.usdBalance - action.payload).toFixed(2)),
        bitcoinBalance: state.bitcoinBalance + Number((action.payload / state.marketPrice).toFixed(8))
      })
    case BUY_DOLLARS:
      return Object.assign({}, state, {
        usdBalance: Number(state.usdBalance + (action.payload * state.marketPrice)).toFixed(2),
        bitcoinBalance: state.bitcoinBalance - action.payload
      })
    default:
      return state;
  };
};

export default rootReducer;
