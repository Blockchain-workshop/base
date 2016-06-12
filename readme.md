# Readme

## Komme i gang

I denne workshopen vil vi lage vår egen javascript app, som bruker blockchainen
som en enkel database (via en smart-contract). For å komme i gang trenger du
`geth`, `node` og `npm`.

Mappestrukturen i prosjektet er standardoppsettet generert av CLI-verktøyet
`truffle`. Et verktøy for å forenkle prosessen med å komme i gang med Ethereum.
Truffle vil her brukes til bygging, testing og deploying av kontraktene vi
lager. I tillegg vil den hjelpe oss med å bygge frontenden - og legge
våre bygde kontrakter tilgjengelig i scriptet.

For å starte opp en enkel lokal blockchain, og deploye din første app gjør du
følgende: (`-- -e test` betyr at vi ønsker å bruke test-environment)

1. `npm run start-dev-server` (et eget konsollvindu)
2. `npm run deploy -- -e test`
3. `npm run build-frontend --e test`
4. `npm run serve -- -e test`
5. Åpne opp [http://localhost:8080](http://localhost:8080) i nettleseren

Nå kan du fortsette med å ta en titt på oppgavene

* [Oppgave 1 - Bli kjent med blockchain](./oppgave1.md)
* [Oppgave 2 - Din første app](./oppgave2.md)

### Tilgjengelige kommandoer (via npm)

Alle scriptene tar inn en environmentflagg, som kan legged med å legge til
`-- -e {test/development}`. Default er development.

* `npm run serve`: Kontinuerlig bygger javascript-appen, og server på port 8080
* `npm run compile` vil kompilere kontrakten din
* `npm run build-js` bygger javascriptapplikasjonen
* `npm run start-dev-server` starter en lokal dev-server, brukes ved deploy og
testing
* `npm run deploy` vil kompilere + deploye applikasjonen din til ditt lokale
dev-nettverk
* `npm run test` vil kjøre alle testene

### Lage en wallet

1. Bruk `geth attach http://localhost:8545` til å koble til geth-console
2. Lag account med `personal.newAccount("mypassword");`

For å sjekke hvor mye ether du har kan du kjøre følgende kommandoer: 

```javascript
> primary = eth.accounts[0]
> balance = web3.fromWei(eth.getBalance(primary), "ether");
```