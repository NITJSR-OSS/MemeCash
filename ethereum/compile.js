const path = require("path");
const fse = require("fs-extra");
const solc = require("solc");
const buildPath = path.join(__dirname, "../meme-cash-frontend/src/build");
const contractPath = path.join(__dirname, "./Contracts");

function compileContract() {
  fse.ensureDirSync(buildPath);
  fse.emptyDirSync(buildPath);

  const fileName = fse.readdirSync(contractPath);
  let sourceCode = fse.readFileSync(
    path.resolve(contractPath, fileName[0]),
    "utf-8"
  );

  let input = {
    language: "Solidity",
    sources: {
      Contract: {
        content: sourceCode,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  let output = JSON.parse(solc.compile(JSON.stringify(input)));
  fse.writeFileSync(
    path.join(buildPath, "MemeCash.json"),
    JSON.stringify(output["contracts"]["Contract"]["MemeCash"])
  );
  fse.writeFileSync(
    path.join(buildPath, "MemeCashFactory.json"),
    JSON.stringify(output["contracts"]["Contract"]["MemeCashFactory"])
  );
}

compileContract();
