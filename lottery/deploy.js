const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider('vacant journey purpose expose virtual chaos grief attract pluck around immense west',
    'https://rinkeby.infura.io/v3/8e47910e1d3947f583640d662e82c2ce');

const web3 = new Web3(provider);

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    console.log("deploying using account:", accounts[0]);
    const inboxContract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: 1000000 });
    console.log("interrrrrfaccce");
    console.log(interface);
    console.log("contract deployed to ", inboxContract.options.address);
}

deploy();