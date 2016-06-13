import config from "config.js";
import Premium from "contracts/Premium.sol.js";
import Web3 from "web3";
import Pudding from "ether-pudding";

const host = config.rpc.host || "localhost";
const port = config.rpc.port || "8545";

const web3 = new Web3();
Pudding.setWeb3(web3);
web3.setProvider(new web3.providers.HttpProvider("http://" + host + ":" + port));

Premium.load(Pudding);

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
  });
}
