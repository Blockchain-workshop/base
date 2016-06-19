# Oppgave 1 - Bli kjent med Geth

Det første vi må gjøre er å sørge for at vi har nødvendig programmvare
installert på maskinen. I denne workshopen vil vi bruke `geth`. Geth
er program som fungerer som en fullstendig node på ethereum-nettverket.
Dette vil da være vår inngangsport for å ta i bruk blockchainen. 

For å installere geth kan du følge [installasjonsintrusjonene](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum). 
Når det er gjort kan du verifisere at geth er tilgjengelig via konsollen
med kommandoen `geth version`.

## Koble til nettverket og synkronisere

Det første vi skal gjøre er å få startet opp noden vår og laste ned blokkene
fra de andre nodene i nettverket. For å gjøre det enkelt å komme i gang
har vi laget et lite startup-script kallt `./start-geth.sh`. Dette scriptet
vil starte opp Geth som en node på vårt nettverk, og initiere den med vår
unike genesisblokk. I tillegg har vi satt opp en enkelt maskin som `bootnode`,
det vil si et første kontaktpunkt som klienten din kan ta kontakt med for å
oppdage resten av nettverket.

Når du har startet opp noden skal den nå koble til andre noder i nettverket og
laste den alle blokkene som har blitt minet. Om alt fungerer som det skal
burde du se en eller flere `imported X block(s)` i konsollen.

Klienten vil nå hele tiden lytte etter nye blokker som blir minet, og
importere de om nødvendig. I tillegg er du nå også en fullverdig node i
nettverket, som betyr at andre noder kan koble til deg for å laste ned blokker.

## Bli kjent med APIet til Geth

Geth kommer med et RPC-api som man kan bruke for å ta i bruk blockchainen.
Dette kan du f.eks. ta i bruk i node-applikasjoner via et rammeverk som
heter [web3](https://github.com/ethereum/wiki/wiki/JavaScript-API).

For å bli litt bedre kjent med systemet vi bruker, og samtidig faktisk få
kjenne litt på hvordan en blockchain fungerer, vil vi først prøve å ta i
det i bruk via en [interaktiv javascript-konsoll](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console) 
som følger med Geth. Du kobler til ved å skrive
`geth attach http://localhost:8545`

### Opprette en konto

Alt vi gjør på en blockchain ender opp som transaksjoner, som må verfiseres og
mines for å kunne ble en aktiv del av blockchainen. For at minere skal ha lyst
til å mine din blokk må man gi dem et insentiv - og i ethereum (og BitCoin)
gjøres dette ved at man legger ved en liten "fee" som mineren får som
belønning for å ta med transaksjonen din i blokken som blir minet.

Før vi kan skaffe ether, som er navnet på valuttaen, må vi ha en konto
til den. Tilgjengelige kontoer ligger lagret på variabelen `eth.accounts`.
Som en liste med addresser.

Om resultatet fra funkksjonen var en tom liste, betyr det at ingen kontoen
har blitt satt opp enda - og vi må lage en ny konto vi kan bruke. For å gjøre
dette kan vi bruker kommandoen `personal.newAccount()`. Returverdien er
addressen til addressen som ble opprettet.

Det som skjedde når du kjørte denne kommandoen var at Geth opprettet et
public/private nøkkelpar som representerer din konto. I tillegg lager den
en addresse, som i praksis bare er en hash av public-keyen din. Alle
transaksjoner du gjør på BlockChainen må signeres med din privatekey
slik at man kan verifisere at du er den faktiske eieren av kontoen.

## Oppgaver, prøve litt på egenhånd

I oppgavene her er det ment at du skal bruke terminal-klienten. Det er lagt
opp til at man skal samarbeide på disse oppgavene. Om noe er vanskelig eller
uklart er det bare å spørre om hjelp.

1. Sjekk hvor mye du har tilgjengelig på din konto.
2. Prøv og mine et par blokker med Geth sin CPU-miner.
    * Følg med i konsollen til Geth, for å se hva som skjer
    * Husk å skru den av igjen etterpå
3. Finn ut hvor mye du har på kontoen etter å ha minet, i ether.
    * Ethereum forholder seg til enheten Wei, og har en helper for
    konvertering mellom enheter.
4. Prøv og overføre litt ether gjennom en transaksjon
    * Du kan enten sende til en andre som deltar på workshopen eller
    opprette en ekstra konto selv.
    * Husk å unlocke kontoen du sender fra
5. Hva skjer når man gjør en transaksjon, fra du skriver noe i konsollen
    til mottakeren får sin ether? Hvordan blir ting distribuert utover
    nettverket? Drøft med sidemannen.
