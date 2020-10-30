import Counter from "../Components/Counter";
import "../CSS/Card.css";

import React, { Component } from "react";
import { Web3Context } from "../context/web3context";
import { FaEthereum } from "react-icons/fa";
// import axios from "axios";

class Cards extends Component {
  static contextType = Web3Context;

  state = {
    memeContract: null,
    memeHash: null,
    downvoteCount:null,
    upvoteCount:null,
    upvoted:false,
    downvoted:false,
    loading:true,
    totalDonation:0,

  };
  
  doanteEther= async ()=>{
    await this.state.memeContract.methods.donate().send({from:this.context.account, vlaue:Math.pow(10,18)})
     .then(async ()=>{
      const totalDonation= await this.state.memeContract.methods.getTotalDonation().call();
      this.setState({totalDonation})
     })
  }

    toggleUpvote  =async ()=>{
     await this.state.memeContract.methods.toggleUpvote().send({from:this.context.account})
      .then(async ()=>{
        const downvoteCount= await this.state.memeContract.methods.getTotalDownvotes().call();
        this.setState({downvoteCount});
        const upvoteCount= await this.state.memeContract.methods.getTotalUpvotes().call();
        this.setState({upvoteCount});
      })
    }

     toggleDownvote =async ()=>{
      await this.state.memeContract.methods.toggleDownvote().send({from:this.context.account})
       .then(async ()=>{
         const downvoteCount= await this.state.memeContract.methods.getTotalDownvotes().call();
         this.setState({downvoteCount});
         const upvoteCount= await this.state.memeContract.methods.getTotalUpvotes().call();
         this.setState({upvoteCount});
         
       })
     } 

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
    const downvoteCount= await memeContract.methods.getTotalDownvotes().call();
    this.setState({downvoteCount});
    const upvoteCount= await memeContract.methods.getTotalUpvotes().call();
    this.setState({upvoteCount});
    this.setState({loading:false});
    const totalDonation= await memeContract.methods.getTotalDonation().call();
    this.setState({totalDonation})
    console.log('loaded card');
    
  }

  render() {
    console.log(this.props);
    return (
       <>
      {! this.state.loading && 
      
      <div className="card">
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
          <button className="donate">DONATE</button>
        </div>
        

       
        {/* <div>
          <p>{this.state.count}</p>{" "}
        </div> */}
      

         <Counter className="vote" 
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
      }
      </>
    );
  }
}

export default Cards;
