const IpfsHttpClient = require("ipfs-http-client");
export const ipfs = new IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
