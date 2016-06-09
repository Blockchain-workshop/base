# Readme

## Komme i gang

I denne workshopen vil vi lage vår egen javascript app, som bruker blockchainen
som en enkel database (via en smart-contract). For å komme i gang trenger du
`geth`, `node` og `npm`.

Mappestrukturen i prosjektet er standardoppsettet generert av CLI-verktøyet
`truffle`. Et verktøy for å forenkle prosessen med å komme i gang med Ethereum.
Truffle vil her brukes til bygging, testing og deploying av kontraktene vi lager.

For å starte opp en enkel lokal blockchain, og deploye din første app gjør du følgende

1. `npm run start-dev-server` (et eget konsollvindu)
2. `npm run deploy -e test`
3. `npm run build-frontend -e test`
4. `npm run app-server`
5. Åpne opp http://localhost:4321 i nettleseren

### Legge ut app på vår private blockchain

For å kunne legge den ut på den private blockchainen som er satt opp for workshopen
vil vi bruke `geth` i stede for `testrpc`. Dette vil fungere helt likt som den
offentlige blockchainen. Dette betyr at du må ha en egen konto, med ether tilgjengelig,
slik at du kan betale for å legge ut kontrakten på nettverket.

Først må du lage en account med geth, dette gjør du med følgende kommando:
`geth --datadir ./datadir account new`
Den vil da først spørre deg om passord for å lage en wallet. Når den så starter opp
ethereum-noden på din maskin vil den prøve å unlocke kontoen din, og du må skrive
inn passordet på nytt.

Denne nye kontoen din vil ikke inneholde noe ether, og du har derfor ikke mulighet
til å gjøre noe på nettverket. Normalt ville man måtte kjøpe ether fra andre, men siden
dette er en privat blockchain har vi satt opp vår egen lille DApp som deler ut penger
til de som spør. *Insert forklaring på hvordan hente ut penger*

Når du har fått penger inn på kontoen din har du mulighet for å begynne å bruke
blockchainen. Deploy appen med `npm run deploy` og den vil bli lagt ut på blockchainen.

Hvis du nå bygger frontend applikasjonen på nytt med kommandoen `npm run build-frontend`
vil du kunne besøke nettsiden til appen på nytt, og bruke tjenesten via blockchainen. Dette
kan du verifisere med å be noen besøke appen på din side (bare bytt ut localhost med din
lokale IP) og overfør noen MetaCoins til dem.

### Tilgjengelige kommandoer (via npm)

* `npm run build-frontend`: Bygger javascript-appen vår.
* `npm run compile` vil kompilere kontrakten din
* `npm run start-dev-server` starter en lokal dev-server, brukes ved deploy og testing
* `npm run deploy` vil kompilere + deploye applikasjonen din til ditt lokale dev-nettverk
* `npm run test` vil kjøre alle testene

### Lage en wallet

1. Bruk `geth attach http://localhost:8545` til å koble til geth-console
2. Lag account med `personal.newAccount("mypassword");`

For å sjekke hvor mye ether du har kan du kjøre følgende kommandoer: 

```javascript
> primary = eth.accounts[0]
> balance = web3.fromWei(eth.getBalance(primary), "ether");
```