   
module.exports = {
    networks: {
      development: {
        host: "localhost",
        port: 7545,
        network_id: "*", // Match any network id
      },
      rinkeby: {
        provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`),
        network_id: 4,       // Rinkeby's network id
        gas: 4500000,        // Gas limit
        gasPrice: 10000000000, // 10 gwei
      }
    },
    compilers: {
      solc: {
        version: "^0.8.0",
      },
    },
  };
  
