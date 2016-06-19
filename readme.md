# Readme

I denne workshopen skal vi prøve å gi deg en liten introduksjon til blockchain
gjennom å ta i bruk en blockchain. Vi vil gå gjennom enkle ting som å sette
opp en konto, gjøre transaksjoner og utveksle blokker med andre noder.

## Oppgave 1 - Bli kjent med Geth

Det første vi må gjøre er å sørge for at vi har nødvendig programmvare
installert på maskinen. I denne workshopen vil vi bruke `geth`. Geth
er program som fungerer som en fullstendig node på ethereum-nettverket.
Dette vil da være vår inngangsport for å ta i bruk blockchainen. 

For å installere geth kan du følge [installasjonsintrusjonene](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum). 
Når det er gjort kan du verifisere at geth er tilgjengelig via konsollen
med kommandoen `geth version`.

### Koble til nettverket og synkronisere

Det første vi skal gjøre er å få startet opp noden vår og laste ned blokkene
fra de andre nodene i nettverket. For å gjøre det enkelt å komme i gang
har vi laget et lite startup-script kallt `./start-geth.sh`. Dette scriptet
vil starte opp Geth som en node på vårt nettverk, og initiere den med vår
unike genesisblokk. I tillegg har vi satt opp en enkelt maskin som `bootnode`,
det vil si et første kontaktpunkt som klienten din kan ta kontakt med for å
oppdage resten av nettverket.

Når du har startet opp noden skal den nå koble til andre noder i nettverket og
laste den alle blokkene som har blitt minet. Om alt fungerer som det skal
burde du se `imported X block(s)` i konsollen.

Klienten vil nå hele tiden lytte etter nye blokker som blir minet, og
importere de om nødvendig. I tillegg er du nå også en fullverdig node i
nettverket, som betyr at andre noder kan koble til deg for å laste ned blokker.

### Bli kjent med APIet til Geth

Geth kommer med et RPC-api som man kan bruke for å ta i bruk blockchainen.
Dette kan du f.eks. ta i bruk i node-applikasjoner via et rammeverk som
heter [web3](https://github.com/ethereum/wiki/wiki/JavaScript-API).

For å bli litt bedre kjent med systemet vi bruker, og samtidig faktisk få
kjenne litt på hvordan en blockchain fungerer, vil vi først prøve å ta i
det i bruk via en [interaktiv javascript-konsoll](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console) 
som følger med Geth. Koble til med å skrive `geth attach http://localhost:8545`



