#!/bin/sh

datadir="./datadir"
genesisfile="genesis.json"
networkid="123"
rpcmodules="admin,miner,db,eth,debug,personal,web3,net"

if [ ! -d "$DIRECTORY/chaindata" ]; then
    geth --datadir $datadir --networkid $networkid init $genesisfile
fi

geth --datadir $datadir --networkid $networkid --rpc --rpcapi='$rpcmodules'