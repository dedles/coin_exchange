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
      tradeAmount: "",
      errorText: '',
      hasError: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayQuote = this.displayQuote.bind(this);
    this.checkError = this.checkError.bind(this);
  }

  componentDidMount(){
    this.props.getMarketPrice()
  }

  handleChange(value, stateItem) {
    this.setState({
      [stateItem]: value,
      errorText: ""
    });
  }

  checkError(from, to, amount){
    if(from == "USD" && this.props.usdBalance < amount){
      this.setState({
        errorText: "You don't have this amount"
      })
      return true
    }else if ( from === "BTC" && this.props.bitcoinBalance < amount){
      this.setState({
        errorText: "You don't have this amount"
      })
      return true
    }else{
      return false
    }
  }

  handleSubmit(e) {
    e.preventDefault(this.state.tradeAmount);
    let {tradeAmount, currencyTo, currencyFrom} = this.state;
    let hasError = this.checkError(currencyFrom, currencyTo, tradeAmount);
    if(!hasError){
      if(currencyFrom === 'USD' && currencyTo === "BTC"){
        this.props.buyBitcoin(Number(tradeAmount))
      }else if (currencyFrom === 'BTC' && currencyTo === "USD"){
        this.props.buyDollars(Number(tradeAmount))
      }
    }else{
      this.setState({
        errorText: "You don't have this amount!"
      })
    }
    this.setState({
      tradeAmount: ""
    })
  }

  displayQuote(){
    let displayQuote = "Display quote";
    let {currencyTo, currencyFrom, tradeAmount} = this.state
    if(tradeAmount && currencyTo == "BTC" && currencyFrom == "USD"){

      displayQuote = (Number(tradeAmount) / this.props.marketPrice).toFixed(8)
    } else if (tradeAmount && currencyTo == "USD" && currencyFrom == "BTC"){
      displayQuote = Number(tradeAmount) * this.props.marketPrice
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

            {this.state.errorText && <div className="errorText">{this.state.errorText}</div>}
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
