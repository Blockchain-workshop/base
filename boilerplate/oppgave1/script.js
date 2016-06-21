var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Skal returnere en liste med alle tilgjengelige kontoer
function getAvalibleAccounts() {

}

// Skal returnere hvor mye ether en bestemt konto har
function getBalanceForAccount(account) {

}

// Skal sende ether til spesifisert konto
// Mengden er i ether, husk å konvertere til Wei før man sender
// Husk å låse opp og låse accounten
function sendEther(fromAddress, toAddress, amount, password) {

}







/*
 * Funsjonene under her skal du egentlig ikke trenger å gjøre noe med
 * De står ansvarlig for å sette opp siden og kaller funksjonene over
 * for å hente data.
 */

function handleFormSubmit(event) {
    event.preventDefault();
    var fromAddress = document.getElementById("input-from").value;
    var toAddress = document.getElementById("input-to").value;
    var amount = parseInt(document.getElementById("input-amount").value);
    var password = document.getElementById("input-password").value;

    try {
        sendEther(fromAddress, toAddress, amount, password);
        document.getElementById("input-to").value = "";
        document.getElementById("input-amount").value = "";
        document.getElementById("input-password").value = "";
        document.getElementById("message").innerHTML = "Ether sent!";
    } catch(err) {
        document.getElementById("message").innerHTML = "Error: " + err.message;
    }
}

function handleOnChangeAddress(event) {
    updateAvalibleEther(event.target.value);
    document.getElementById("input-password").value = "";
}

function updateAvalibleEther(account) {
    var balance = getBalanceForAccount(account);
    document.getElementById("avalible-ether").innerHTML = balance;
}

function populateFromAddressSelectBox() {
    var selectElement = document.getElementById("input-from");
    var accounts = getAvalibleAccounts();

    for(account of accounts) {
      const option = new Option(account, account);
      selectElement.appendChild(option);
    }
}

 function main() {
    populateFromAddressSelectBox();
    var accounts = getAvalibleAccounts();
    if(accounts.length > 0) {
        updateAvalibleEther(getAvalibleAccounts()[0]);
    }
 }

 main();