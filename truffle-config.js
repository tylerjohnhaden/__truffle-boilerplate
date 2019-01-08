// https://github.com/trufflesuite/truffle-hdwallet-provider
var HDWalletProvider = require('truffle-hdwallet-provider');


// environment variables set in the package config
var networkId = process.env.npm_package_config_ganache_networkId;
var gasPrice = process.env.npm_package_config_ganache_gasPrice;
var gasLimit = process.env.npm_package_config_ganache_gasLimit;

// environment variables not set in the package config
var infuraProjectId = process.env.INFURA_PROJECT_ID;
var mnemonic = process.env.MNEMONIC;

// naive environment assertions, since these aren't present by default
if (infuraProjectId === undefined || infuraProjectId === '') {
    throw new Error('truffle-config.js needs the environment variable "INFURA_PROJECT_ID"');
} else if (mnemonic === undefined) {
    throw new Error('truffle-config.js needs the environment variable "MNEMONIC"');
} else if (mnemonic.split(' ').length != 12) {
    throw new Error('The environment variable "MNEMONIC" must be 12 words (space delineated)');
}


// https://truffleframework.com/docs/truffle/reference/configuration
var truffleConfig = {
    networks: {
        development: {
            host: '127.0.0.1',  // ganache defaults
            port: 8545,         // ganache defaults
            network_id: networkId,
            gas: gasLimit,
            gasPrice: gasPrice,
            // use the local ganache and the mnemonic to generate our main address
            from: (new HDWalletProvider(mnemonic, "http://127.0.0.1:8545")).getAddress(0)
        },
        kovan: {
            provider: () =>
                new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/${infuraProjectId}`),
            network_id: 42, // Kovan Id
            gas: 3000000,
            gasPrice: 100000000000
        },
        rinkeby: {
            provider: () =>
                new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraProjectId}`),
            network_id: 4, // Rinkeby Id
            gas: 3000000,
            gasPrice: 100000000000
        },
        ropsten: {
            provider: () =>
                new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraProjectId}`),
            network_id: 3, // Ropsten Id
            gas: 3000000,
            gasPrice: 100000000000
        },
        live: {
            provider: () =>
                new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraProjectId}`),
            network_id: 1, // Mainnet Id
            gas: 4000000,
            gasPrice: 100000000000
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    },
    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions : {
            currency: 'USD',
            gasPrice: 2
      }
    }
};

console.info('\nSetting Truffle Configuration:\n', truffleConfig, '\n');
module.exports = truffleConfig;

