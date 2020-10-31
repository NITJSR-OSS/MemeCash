const fse = require("fs-extra");
const path = require("path");
const hdWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const provider = new hdWalletProvider(
  "<Metamask seed here>",
  "https://kovan.infura.io/v3/b01d4ab35099466aa23bc12a4ed8f852"
);

const buildPath = path.join(__dirname, "../meme-cash-frontend/src/build");

async function deployContract() {
  let web3 = await new Web3(provider);
  let account = await web3.eth.getAccounts();
  account = account[0];
  let memeFactoryContract = fse.readFileSync(
    path.resolve(buildPath, "MemeCashFactory.json")
  );
  memeFactoryContract = JSON.parse(memeFactoryContract);
  const deployedContractAddress = await new web3.eth.Contract(
    memeFactoryContract.abi
  )
    .deploy({
      data: "0x" + memeFactoryContract.evm.bytecode.object,
    })
    .send({
      from: account,
      gas: 3000000,
    });

  fse.writeFileSync(
    path.resolve(buildPath, "address.txt"),
    deployedContractAddress.options.address
  );
}

deployContract();
