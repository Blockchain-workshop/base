# Oppgave 2 - Geth og javascript

I denne oppgaven skal vi bli kjent med hvordan vi kan bruke geth fra javascript
til å lage små apps. Målet for oppgaven er å lage en GUI-interface til Geth,
slik at vi kan lettere bruke kontoene våre uten å måtte bruke terminalen.

Geth kommer med et RPC-api som man kan bruke for å ta i bruk blockchainen.
Dette kan man lett kommunisere med via et rammeverk som heter
[web3](https://github.com/ethereum/wiki/wiki/JavaScript-API), som vi vil bruke
i denne oppgaven.

Boilerplate for oppgaven finner du under `./boilerplate/oppgave2/`. Det meste
av nødvendig kode er skrevet, og alt som egentlig skal gjøres er å fylle
ut de tomme funksjonene i `script.js` slik at alt fungerer.  Du står
selvfølgelig fritt til å bruke kreativiteten og endre på ting om det
er ønskelig.

## Ekstra features, om man har tid og lyst

* Dropdown for å velge konto og sende fra
* Hindre fra å sende mer ether enn man har tilgjengelig
* Adressebok
