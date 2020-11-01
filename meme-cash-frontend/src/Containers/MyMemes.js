import React, { Component } from "react";
import "../CSS/MyMemes.css";
import { Web3Context } from "../context/web3context";
import { FaEthereum } from "react-icons/fa";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";

class MyMemes extends Component {
  static contextType = Web3Context;

  state = {
    memeContract: null,
    memeHash: null,
    downvoteCount: null,
    upvoteCount: null,
    upvoted: false,
    downvoted: false,
    loading: true,
    totalDonation: 0,
    owned: false,
  };

  async componentDidMount() {
    const owned = await this.context.myMemes.includes(this.props.memeAddress);
    this.setState({ owned });
    console.log(owned);
    const memeContract = await new this.context.web3.eth.Contract(
      this.context.memeABI,
      this.props.memeAddress
    );
    this.setState({ memeContract });
    console.log(memeContract);
    const memeHash = await memeContract.methods.getMemeHash().call();
    this.setState({ memeHash });
    console.log(memeHash);
    const downvoteCount = await memeContract.methods.getTotalDownvotes().call();
    this.setState({ downvoteCount });
    const upvoteCount = await memeContract.methods.getTotalUpvotes().call();
    this.setState({ upvoteCount });
    const totalDonation = await memeContract.methods.getTotalDonation().call();
    this.setState({ totalDonation });
    console.log("loaded card");
    this.setState({ loading: false });
  }

  render() {
    console.log(this.context.myMemes);
    console.log(this.props);
    return (
      <>
        {!this.state.loading && (
          <div className="myMemes">
            <div className="myImage">
              {this.state.memeHash && (
                <img
                  src={"https://ipfs.infura.io/ipfs/" + this.state.memeHash}
                  alt=""
                />
              )}
              <div id="donation">
                <div>
                  <FaEthereum />
                  {this.state.totalDonation}
                </div>
                <div id="votes">
                  <div>
                    <TiArrowUpOutline />
                    {this.state.upvoteCount}
                  </div>
                  <div>
                    <TiArrowDownOutline />
                    {this.state.downvoteCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MyMemes;
