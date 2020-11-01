import Counter from "../Components/Counter";
import "../CSS/Card.css";
import React, { Component } from "react";
import { Web3Context } from "../context/web3context";
import { FaEthereum } from "react-icons/fa";

class Cards extends Component {
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

  doanteEther = async (value) => {
    await this.state.memeContract.methods
      .donate()
      .send({ from: this.context.account, value: value })
      .then(async () => {
        const totalDonation = await this.state.memeContract.methods
          .getTotalDonation()
          .call();
        this.setState({ totalDonation });
      });
  };

  toggleUpvote = async () => {
    await this.state.memeContract.methods
      .toggleUpvote()
      .send({ from: this.context.account })
      .then(async () => {
        const downvoteCount = await this.state.memeContract.methods
          .getTotalDownvotes()
          .call();
        this.setState({ downvoteCount });
        const upvoteCount = await this.state.memeContract.methods
          .getTotalUpvotes()
          .call();
        this.setState({ upvoteCount });
      });
  };

  toggleDownvote = async () => {
    await this.state.memeContract.methods
      .toggleDownvote()
      .send({ from: this.context.account })
      .then(async () => {
        const downvoteCount = await this.state.memeContract.methods
          .getTotalDownvotes()
          .call();
        this.setState({ downvoteCount });
        const upvoteCount = await this.state.memeContract.methods
          .getTotalUpvotes()
          .call();
        this.setState({ upvoteCount });
      });
  };

  async componentDidMount() {
    // const owned = this.context.myMemes.includes();
    // this.setState({owned})
    // console.log(`owned ${owned}`);
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
          <div
            className="card"
            style={{ backgroundColor: this.state.owned && "#7a5f16" }}
          >
            <div className="image">
              {this.state.memeHash && (
                <img
                  src={"https://ipfs.infura.io/ipfs/" + this.state.memeHash}
                  alt=""
                />
              )}
              <div className="wrap-donatio-amount inlineBlock">
                <FaEthereum className="inlineBlock" />
                <li className="inlineBlock">{this.state.totalDonation}</li>
              </div>
              <button className="donate">{this.state.owned}</button>
            </div>

            <Counter
              className="vote"
              owned={this.state.owned}
              totalDonation={this.state.totalDonation}
              upvoteCount={this.state.upvoteCount}
              upvoted={this.state.upvoted}
              downvoted={this.state.downvoted}
              downvoteCount={this.state.downvoteCount}
              toggleUpvote={this.toggleUpvote}
              toggleDownvote={this.toggleDownvote}
              doanteEther={this.doanteEther}
            />
          </div>
        )}
      </>
    );
  }
}

export default Cards;
