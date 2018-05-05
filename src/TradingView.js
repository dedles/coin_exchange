import React from "react";
import {connect } from "react-redux";
import axios from 'axios'
import * as actions from "./actions/index.js"


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
      currencyFrom: 'USD',
      currencyTo: "BTC",
      tradeAmount: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    // this.props.getMarketPrice()

  }

  handleChange(value, stateItem) {
    this.setState({
      [stateItem]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }


  render() {
    let {usdBalance, bitcoinBalance} = this.props;
    let {currencyFrom, currencyTo, tradeAmount } = this.state;
    return (
      <div className="root">
        <div className="viewContainer">
          Account Balance
          <br/>
          <div className="balance">
            <div><span className="currencyType">USD</span> {usdBalance}</div>
            <div><span className="currencyType">BTC</span> {bitcoinBalance}</div>
          </div>
          <form onSubmit={this.handleSubmit} className="tradeForm">
            Trade
            <select value={currencyFrom} onChange={(e) => this.handleChange(e.target.value, "currencyFrom")}>
              <option value="USD">USD</option>
              <option value="BTC">BTC</option>
            </select>
            <input type="text" placeholder="Enter your amount" value={tradeAmount} onChange={(e) => this.handleChange(e.target.value, 'tradeAmount')}/>
            <select value={currencyTo} onChange={(e) => this.handleChange(e.target.value, "currencyFrom")}>
              <option value="USD">USD</option>
              <option value="BTC">BTC</option>
            </select>
            <div className="quote">
              <em>quote</em>
            </div>
            <button type="submit" className="submit">
              Trade
            </button>

          </form>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(TradingView);
