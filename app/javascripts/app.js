import config from "config.js";
import MetaCoin from "contracts/MetaCoin.sol.js";
import Web3 from "web3";
import Pudding from "ether-pudding";

const host = config.rpc.host || "localhost";
const port = config.rpc.port || "8545";

const web3 = new Web3();
Pudding.setWeb3(web3);
web3.setProvider(new web3.providers.HttpProvider("http://" + host + ":" + port));

MetaCoin.load(Pudding);
let accounts, account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function populateSelectElement() {
    const selectElement = document.querySelector("#accounts");

    accounts.forEach(acc => {
      const option = new Option(acc, acc);
      selectElement.appendChild(option);
    });

    selectElement.value = account;
}

function selectNewAccount(selectedAccount) {
  account = selectedAccount;
  refreshBalance();
}

function refreshBalance() {
  var meta = MetaCoin.deployed();

  meta.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    document.querySelector("#amount").value = "";
    document.querySelector("#receiver").value = "";
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    setStatus("Error sending coin: " + e.message);
  });
};

window.selectNewAccount = selectNewAccount;
window.sendCoin = sendCoin;

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

    populateSelectElement();
    refreshBalance();
  });
}
