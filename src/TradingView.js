import React from "react";
import {connect } from "react-redux";
import axios from 'axios'
import * as actions from "./actions/index.js"

import Select from 'react-select';
import 'react-select/dist/react-select.css';


const selectOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'BTC', label: 'BTC' },
]

class TradingView extends React.Component {
  constructor(){
    super()
    this.state = {
      // currencyFrom: 'USD',
      // currencyTo: "BTC",
      currencyFrom: 'BTC',
      currencyTo: "USD",
      tradeAmount: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayQuote = this.displayQuote.bind(this);
  }

  componentDidMount(){
    this.props.getMarketPrice()

  }

  handleChange(value, stateItem) {
    this.setState({
      [stateItem]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.currencyFrom === 'USD' && this.state.currencyTo === "BTC"){
      this.props.buyBitcoin(Number(this.state.tradeAmount))
    }else if (this.state.currencyFrom === 'BTC' && this.state.currencyTo === "USD"){
      this.props.buyDollars(Number(this.state.tradeAmount))
    }
    this.setState({
      tradeAmount: ""
    })
  }

  displayQuote(){
    let displayQuote = "Display quote";
    let {currencyTo, currencyFrom} = this.state
    if(this.state.tradeAmount && currencyTo == "BTC" && currencyFrom == "USD"){
      displayQuote = (Number(this.state.tradeAmount) / this.props.marketPrice).toFixed(8)
    } else if (this.state.tradeAmount && currencyTo == "USD" && currencyFrom == "BTC"){
      displayQuote = Number(this.state.tradeAmount) * this.props.marketPrice
    }

    return displayQuote;

  }


  render() {
    let {usdBalance, bitcoinBalance} = this.props;
    let {currencyFrom, currencyTo, tradeAmount } = this.state;
    let quote = this.displayQuote()
    return (
      <div className="root">
        <div className="viewContainer">
          Account Balance
          <br/>
          <div className="balance">
            <div><span className="currencyType">USD</span> {usdBalance}</div>
            <div><span className="currencyType">BTC</span> {bitcoinBalance.toFixed(8)}</div>
          </div>
          <form onSubmit={this.handleSubmit} className="tradeForm">
            <div className="transaction">
              Trade
            </div>
            <Select
              name="currencyFrom"
              className="formSelect"
              value={currencyFrom}
              backspaceRemoves={false}
              clearable={false}
              onChange={(e) => this.handleChange(e.value, "currencyFrom")}
              options={selectOptions}/>
            <input className="formInput" type="number" placeholder="Enter your amount" value={tradeAmount} onChange={(e) => this.handleChange(e.target.value, 'tradeAmount')}/>
            <div className="transaction">
              For
            </div>
            <Select
              name="currencyTo"
              value={currencyTo}
              className="formSelect"
              backspaceRemoves={false}
              clearable={false}
              onChange={(e) => this.handleChange(e.value, "currencyTo")}
              options={selectOptions}/>
            <div className="quote">
              {quote}
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

const mapStateToProps = state => {
  return {
    usdBalance: state.usdBalance,
    bitcoinBalance: state.bitcoinBalance,
    marketPrice: state.marketPrice
  }
}

export default connect(mapStateToProps, actions)(TradingView);
