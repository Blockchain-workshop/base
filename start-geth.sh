#!/bin/sh

datadir="./datadir"
genesisfile="genesis.json"
networkid="123"
rpcmodules="admin,miner,db,eth,debug,personal,web3,net"

if [ ! -d "$datadir/chaindata" ]; then
    echo "initiate genesis-block"
    geth --datadir $datadir --networkid $networkid init $genesisfile
fi

echo "launching geth"
geth --datadir $datadir --networkid $networkid --rpc --rpcapi="$rpcmodules"