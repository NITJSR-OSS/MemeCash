import React, { Component, createContext } from "react";
import initWeb3 from "../services/web3";
import memeCashFactory from "../build/MemeCashFactory.json";
import memesCash from "../build/MemeCash.json";

export const Web3Context = createContext();

export default class Web3ContextProvider extends Component {
  async componentDidMount() {
    const web3 = await initWeb3();
    this.setState({ web3 });
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const memeFactoryContract = await new web3.eth.Contract(
      this.state.memeFactoryABI,
      "0xe0e85F3154438b3750dF1cA703B450Fd675796dA"
    );
    this.setState({ memeFactoryContract });
    memeFactoryContract.methods
      .getDeployedMemes()
      .call()
      .then((deployedMemes) => {
        console.log(deployedMemes);
        this.setState({ deployedMemes });
      });
    console.log(this.state.account);
    console.log(this.state.memeFactoryABI);
  }
  state = {
    account: null,
    web3: null,
    memeFactoryABI: memeCashFactory.abi,
    memeABI: memesCash.abi,
    memeFactoryContract: null,
    deployedMemes: [],
  };
  render() {
    return (
      <Web3Context.Provider value={{ ...this.state }}>
        {this.props.children}
      </Web3Context.Provider>
    );
  }
}
