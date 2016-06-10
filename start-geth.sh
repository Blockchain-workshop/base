#!/bin/sh
if [[ $#  -eq 0 || $1 == *"--"* ]]; then
 datadir="./datadir"
else
 datadir="./$1"
 shift
fi

genesisfile="genesis.json"
networkid="956456"
rpcmodules="admin,miner,db,eth,debug,personal,web3,net"

if [ ! -d "$datadir/chaindata" ]; then
    echo "initiate genesis-block"
    geth --datadir $datadir --networkid $networkid init $genesisfile
    geth --datadir $datadir --networkid $networkid account new
fi

echo "launching geth"
<<<<<<< HEAD
geth --datadir $datadir --networkid $networkid --rpc --rpcapi="$rpcmodules" --unlock 0 --rpccorsdomain "*" $@
=======
geth --datadir $datadir --networkid $networkid --rpc --rpcapi="$rpcmodules" --unlock 0 --rpccorsdomain "*"
>>>>>>> 8283d5365d9095047e19ea4c5ab7ce5c40eeb3eb
