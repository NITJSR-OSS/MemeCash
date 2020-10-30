import Web3 from "web3";

let web3;
export default async function initWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    
  }
  if (window.web3) web3 = new Web3(window.web3.currentProvider);
  else {
    
    const provider = new Web3.providers.HttpProvider("https://kovan.infura.io/v3/b01d4ab35099466aa23bc12a4ed8f852");
    web3 = new Web3(provider);
    console.log(provider);
  }
  return web3;
}




// export default async function initWeb3() {
//   if (window.web3) web3 = new Web3(window.web3.currentProvider);
//   else {
//    // const provider = new Web3.providers.HttpProvider("https://kovan.infura.io/v3/fe7dde2ee52b4a7d940efc60cf16ec47");
  
//     const provider = new Web3.providers.HttpProvider("https://kovan.infura.io/v3/b01d4ab35099466aa23bc12a4ed8f852");
//     web3 = new Web3(provider);
//     console.log(provider);
//   }
//   return web3;
// }
