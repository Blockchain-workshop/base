#!/bin/sh
if [[ $#  -eq 0 || $1 == *"--"* ]]; then
 datadir="./datadir"
else
 datadir="./$1"
 shift
fi

genesisfile="genesis.json"
bootnodes="enode://598f0a9e0386ca2611f03a05836de1130f4edf1bb1b24e27eee8e54be0edc6bf9020a911e890487af7df0d81afa9ceb47c00828a5897a7e4ce3ec7abe9a49ed8@10.0.20.165:30303"
networkid="956456"
rpcmodules="admin,miner,db,eth,debug,personal,web3,net"

if [ ! -d "$datadir/chaindata" ]; then
    echo "initiate genesis-block"
    geth --datadir $datadir --networkid $networkid init $genesisfile
fi

echo "launching geth"
geth --datadir $datadir --bootnodes $bootnodes --networkid $networkid --rpc --rpcapi="$rpcmodules" --rpccorsdomain "*" $@
