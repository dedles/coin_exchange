import React from "react";
import {connect } from "react-redux";
const mapStateToProps = state => {
  return {
    usdBalance: state.usdBalance,
    bitcoinBalance: state.bitcoinBalance,
    marketPrice: state.marketPrice
  }
}
class TradingView extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }

  render() {
    return (
      <div className="viewContainer">
        TradingView
      </div>
    )
  }
}

export default connect(mapStateToProps)(TradingView);
