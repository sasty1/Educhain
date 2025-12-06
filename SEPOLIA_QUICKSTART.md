# ⚡ Sepolia Testnet - Quick Start

## What Changed?

Your app now supports **Ethereum Sepolia Testnet** for production deployment on Vercel! 🎉

## 🎯 What You Need to Do

### 1. Deploy Your Contract to Sepolia

```powershell
# In project root
cd c:\Users\sokun\Documents\private-school-fhe

# Create .env file with:
# SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
# PRIVATE_KEY=your_private_key

# Deploy
npx hardhat run scripts/deploy.ts --network sepolia
```

**Save the contract address!**

### 2. Update Vercel Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add:
```
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
```

Click **Save** and **Redeploy**

### 3. Done! 🎉

Your app is now live on Sepolia testnet!

## 📋 New Features Added

### 1. Multi-Network Support
Your `contract.ts` now supports:
- ✅ Sepolia Testnet (Ethereum)
- ✅ Local FHEVM
- ✅ Custom FHEVM networks

Switch between networks using `NEXT_PUBLIC_NETWORK` environment variable.

### 2. Network Switcher Component
New component: `components/NetworkSwitcher.tsx`

Add it to your pages:
```tsx
import NetworkSwitcher from '../components/NetworkSwitcher';

export default function YourPage() {
  return (
    <div>
      <NetworkSwitcher />
      {/* Your content */}
    </div>
  );
}
```

It will:
- Show current network status
- Warn if user is on wrong network
- Provide button to switch to correct network

### 3. New Helper Functions

```typescript
import { 
  switchToTargetNetwork,
  getCurrentNetwork,
  getNetworkConfig 
} from './lib/contract';

// Switch to configured network
await switchToTargetNetwork();

// Get network info
const info = await getCurrentNetwork();
console.log(info.isCorrectNetwork); // true/false

// Get app config
const config = getNetworkConfig();
console.log(config.environment); // 'sepolia', 'local', or 'fhevm'
```

## 🔧 Configuration Files Updated

### 1. `contract.ts`
- ✅ Added Sepolia network configuration
- ✅ Dynamic network switching
- ✅ Better error handling
- ✅ Network validation

### 2. `.env.example` (Frontend)
```env
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourAddress
```

### 3. `.env.example` (Root)
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_private_key
```

## 🚀 How Users Will Interact

1. Visit your Vercel URL
2. Click "Connect Wallet"
3. If on wrong network → See warning + switch button
4. Click "Switch to Sepolia Testnet"
5. MetaMask prompts to switch
6. Once on Sepolia → Can use your app!

## 💰 Getting Sepolia ETH

Users need Sepolia ETH to interact:
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia
- https://faucet.quicknode.com/ethereum/sepolia

## 📚 Documentation

- **Full Deployment Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Vercel Setup**: [VERCEL_SETUP.md](./VERCEL_SETUP.md)
- **Main README**: [README.md](./README.md)

## 🧪 Testing Locally with Sepolia

```powershell
cd contracts\scripts\frontend

# Create .env.local
# NEXT_PUBLIC_NETWORK=sepolia
# NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourAddress

npm run dev
```

Visit http://localhost:3000 and test with Sepolia!

## 🎨 Example Usage in Your App

```tsx
import { useEffect, useState } from 'react';
import { getCurrentNetwork, switchToTargetNetwork } from '../lib/contract';
import NetworkSwitcher from '../components/NetworkSwitcher';

export default function ApplyPage() {
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  useEffect(() => {
    checkNetwork();
  }, []);

  const checkNetwork = async () => {
    const info = await getCurrentNetwork();
    setIsCorrectNetwork(info.isCorrectNetwork);
  };

  return (
    <div>
      <h1>Apply for Admission</h1>
      
      {/* Show network status */}
      <NetworkSwitcher />
      
      {/* Only show form if on correct network */}
      {isCorrectNetwork ? (
        <ApplicationForm />
      ) : (
        <p>Please switch to the correct network to continue.</p>
      )}
    </div>
  );
}
```

## ✅ Checklist Before Going Live

- [ ] Contract deployed to Sepolia
- [ ] Contract verified on Etherscan (optional)
- [ ] Environment variables set on Vercel
- [ ] Tested wallet connection
- [ ] Tested network switching
- [ ] Tested application submission
- [ ] Checked transactions on Sepolia Etherscan

## 🎉 You're Ready!

Your Private School Eligibility System is now production-ready on Sepolia testnet!

**Questions?** Check the full guides or open an issue on GitHub.
