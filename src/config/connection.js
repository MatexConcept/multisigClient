// import { createAppKit } from '@reown/appkit/react'
// import { EthersAdapter } from '@reown/appkit-adapter-ethers'
// import { baseSepolia, sepolia } from '@reown/appkit/networks'


// const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;


// const networks = [baseSepolia, sepolia]


// const metadata = {
//   name: 'My Website',
//   description: 'My Website description',
//   url: 'https://mywebsite.com', 
//   icons: ['https://avatars.mywebsite.com/']
// }

// createAppKit({
//   adapters: [new EthersAdapter()],
//   networks,
//   metadata,
//   projectId,
//   themeVariables: {
//     "--w3m-accent": "#d97706",
//     "--w3m-border-radius-master" : "1px",
//   },
//   features: {
//     analytics: true 
//   }
// })


import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { baseSepolia, sepolia } from '@reown/appkit/networks';

// 1. Get projectId
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;

// 2. Set the networks
const networks = [baseSepolia, sepolia];

// 3. Create a metadata object - optional
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
};

// 4. Initialize the EthersAdapter
const ethersAdapter = new EthersAdapter();

// 5. Listen for account changes
if (window.ethereum) {
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
      console.log('Account switched:', accounts[0]);
      // Update the adapter with the new account
    //   ethersAdapter.updateAccount(accounts[0]);
    } else {
      console.log('No accounts connected');
    }
  });
}

// 6. Create a AppKit instance
createAppKit({
  adapters: [ethersAdapter],
  networks,
  metadata,
  projectId,
  themeVariables: {
    "--w3m-accent": "#d97706",
    "--w3m-border-radius-master": "1px",
  },
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

