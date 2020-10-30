import Counter from "../Components/Counter";
import "../CSS/Card.css";

import React, { Component } from "react";
import { Web3Context } from "../context/web3context";
// import axios from "axios";

class Cards extends Component {
  static contextType = Web3Context;

  state = {
    memeContract: null,
    memeHash: null,
  };

  async componentDidMount() {
    const memeContract = await new this.context.web3.eth.Contract(
      this.context.memeABI,
      this.props.memeAddress
    );
    this.setState({ memeContract });
    console.log(memeContract);
    const memeHash = await memeContract.methods.getMemeHash().call();
    this.setState({ memeHash });
    console.log(memeHash);
  }

  render() {
    console.log(this.props);
    return (
      <div className="card">
        <div className="image">
          {this.state.memeHash && (
            <img
              src={"https://ipfs.infura.io/ipfs/" + this.state.memeHash}
              alt=""
            />
          )}
          <button className="donate">DONATE</button>
        </div>

        <Counter className="vote" />
      </div>
    );
  }
}

export default Cards;
