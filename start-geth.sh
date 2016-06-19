#!/bin/sh
if [[ $#  -eq 0 || $1 == *"--"* ]]; then
 datadir="./datadir"
else
 datadir="./$1"
 shift
fi

genesisfile="genesis.json"
bootnodes="enode://cdaba128c8d8e0442ed6a190d709f64725ad955bb00944b72fdb7decbd3219cafd14b90b496e9dcd7ba302181863a7d5540c2fdf263777c83b3abb152432cc25@10.0.20.175:30303"
networkid="956456"
rpcmodules="admin,miner,db,eth,debug,personal,web3,net"

if [ ! -d "$datadir/chaindata" ]; then
    echo "initiate genesis-block"
    geth --datadir $datadir --networkid $networkid init $genesisfile
fi

echo "launching geth"
geth --datadir $datadir --bootnodes $bootnodes --networkid $networkid --rpc --rpcapi="$rpcmodules" --rpccorsdomain "localhost" $@
