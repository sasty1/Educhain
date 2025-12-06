# 🚀 Deployment Guide

## 🌟 Quick Start: Deploy to Sepolia Testnet

This guide will help you deploy your Private School Eligibility System to **Ethereum Sepolia Testnet** and host the frontend on **Vercel**.

### Prerequisites
- ✅ MetaMask wallet installed
- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ Alchemy or Infura account (free)

---

## Part 0: Deploy Smart Contract to Sepolia

### Step 1: Get Sepolia Test ETH

1. Visit [Sepolia Faucet](https://sepoliafaucet.com/)
2. Enter your wallet address
3. Request test ETH (you'll need ~0.1 ETH for deployment)
4. Alternative faucets:
   - https://www.alchemy.com/faucets/ethereum-sepolia
   - https://faucet.quicknode.com/ethereum/sepolia

### Step 2: Get RPC Provider API Key

Choose one provider (Alchemy recommended):

**Option A: Alchemy** (Recommended)
1. Go to https://www.alchemy.com/
2. Sign up for free account
3. Create new app → Select "Ethereum" → "Sepolia"
4. Copy your API key from dashboard

**Option B: Infura**
1. Go to https://infura.io/
2. Sign up and create new project
3. Select "Ethereum" → "Sepolia"
4. Copy your project ID

### Step 3: Configure Environment Variables

In your project root, create/update `.env`:

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=your_wallet_private_key_without_0x_prefix
```

**⚠️ IMPORTANT**: Never commit your `.env` file to GitHub!

**To get your private key from MetaMask**:
1. Open MetaMask
2. Click three dots → Account details
3. Click "Export Private Key"
4. Enter password and copy (remove the `0x` prefix)

### Step 4: Deploy Contract to Sepolia

```powershell
# From project root
cd c:\Users\sokun\Documents\private-school-fhe

# Compile contract
npm run compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia
```

**Save the deployed contract address!** You'll see output like:
```
PrivateSchoolEligibility deployed to: 0x1234567890abcdef...
```

### Step 5: Verify Contract on Etherscan (Optional)

```powershell
npx hardhat verify --network sepolia 0xYourContractAddress "0xYourAdminAddress"
```

### Step 6: Configure Frontend for Sepolia

Navigate to frontend folder and update `.env.local`:

```env
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

That's it! Your contract is now live on Sepolia testnet. 🎉

---

## Part 1: Push to GitHub

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `private-school-fhe` (or your preferred name)
3. Description: "Privacy-first school admission system powered by blockchain and FHE"
4. Choose **Public** or **Private**
5. **Do NOT** initialize with README (we already have files)
6. Click **Create repository**

### Step 2: Initialize Git (if not already done)

Open PowerShell in your project folder and run:

```powershell
cd c:\Users\sokun\Documents\private-school-fhe
git init
```

### Step 3: Create .gitignore

Make sure you have a `.gitignore` file to exclude sensitive files:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Hardhat
cache/
artifacts/
typechain-types/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Misc
*.pem
.vercel
```

### Step 4: Add and Commit Files

```powershell
git add .
git commit -m "Initial commit: Private School Eligibility System with FHE"
```

### Step 5: Connect to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/private-school-fhe.git
git branch -M main
git push -u origin main
```

If prompted, enter your GitHub credentials or use a Personal Access Token.

---

## Part 2: Deploy Frontend on Vercel

### Important: Frontend Only Deployment

**Note**: Vercel will only deploy the **frontend** (Next.js app). The Hardhat blockchain node and smart contract will NOT run on Vercel. This is a demo deployment for the UI only.

### Step 1: Prepare for Vercel

Create a `vercel.json` file in the **frontend folder**:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### Step 2: Update package.json

Make sure your `contracts/scripts/frontend/package.json` has these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**:
```powershell
npm install -g vercel
```

2. **Login to Vercel**:
```powershell
vercel login
```

3. **Navigate to frontend folder**:
```powershell
cd contracts\scripts\frontend
```

4. **Deploy**:
```powershell
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? `private-school-fhe` (or your choice)
- Directory? `.` (current directory)
- Override settings? **N**

5. **Deploy to Production**:
```powershell
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `contracts/scripts/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Click **Deploy**

### Step 4: Configure Environment Variables on Vercel (Critical!)

After deploying to Vercel, add these environment variables:

1. Go to your project on Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add the following:

**For Sepolia Testnet** (Recommended):
```
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

**Optional** (if you want to use your own RPC):
```
NEXT_PUBLIC_SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

4. Click **Save**
5. **Redeploy** your application for changes to take effect

**Important**: Users will need MetaMask connected to Sepolia testnet to interact with your app!

---

## Part 3: Full Production Deployment (Advanced)

For a real production deployment with blockchain:

### Option 1: Deploy to Zama's FHEVM Testnet

1. **Get Zama FHEVM Access**:
   - Visit https://docs.zama.ai/fhevm
   - Request testnet access
   - Get RPC endpoint and gateway URL

2. **Deploy Contract to FHEVM**:
```javascript
// Update hardhat.config.js
networks: {
  fhevm: {
    url: "https://devnet.zama.ai",
    accounts: [process.env.PRIVATE_KEY],
    chainId: 8009
  }
}
```

3. **Deploy**:
```powershell
npx hardhat run scripts/deploy.js --network fhevm
```

4. **Update Vercel Environment Variables**:
   - `NEXT_PUBLIC_FHEVM_RPC=https://devnet.zama.ai`
   - `NEXT_PUBLIC_FHE_GATEWAY=https://gateway.zama.ai`
   - `NEXT_PUBLIC_CONTRACT_ADDRESS=0x...` (your deployed address)

### Option 2: Deploy to Ethereum Testnet (Sepolia)

1. **Get Sepolia ETH**:
   - Visit https://sepoliafaucet.com/
   - Get free test ETH

2. **Update hardhat.config.js**:
```javascript
networks: {
  sepolia: {
    url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
    accounts: [process.env.PRIVATE_KEY]
  }
}
```

3. **Deploy**:
```powershell
npx hardhat run scripts/deploy.js --network sepolia
```

4. **Update Vercel Environment Variables**:
   - `NEXT_PUBLIC_FHEVM_RPC=https://sepolia.infura.io/v3/YOUR_KEY`
   - `NEXT_PUBLIC_CONTRACT_ADDRESS=0x...`

---

## Part 4: Post-Deployment Checklist

### ✅ Before Going Live

- [ ] Test all features on Vercel preview
- [ ] Verify wallet connection works
- [ ] Test application submission
- [ ] Test eligibility checking
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test with different wallets
- [ ] Check console for errors

### ✅ Security

- [ ] Never commit private keys
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS (Vercel does this automatically)
- [ ] Add rate limiting if needed
- [ ] Review smart contract security

### ✅ SEO & Performance

- [ ] Add meta tags for social sharing
- [ ] Optimize images
- [ ] Add favicon
- [ ] Test page load speed
- [ ] Add Google Analytics (optional)

---

## Part 5: Updating Your Deployment

### Update GitHub

```powershell
git add .
git commit -m "Your update message"
git push origin main
```

### Update Vercel

Vercel automatically redeploys when you push to GitHub!

Or manually:
```powershell
cd contracts\scripts\frontend
vercel --prod
```

---

## Part 6: Custom Domain (Optional)

### Add Your Domain to Vercel

1. Go to your project on Vercel
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `educhain.yourdomain.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take 24-48 hours)

---

## Troubleshooting

### Issue: Build Fails on Vercel

**Solution**: Check build logs, ensure all dependencies are in `package.json`

### Issue: Environment Variables Not Working

**Solution**: Make sure they're prefixed with `NEXT_PUBLIC_` for client-side access

### Issue: Wallet Connection Fails

**Solution**: This is expected on Vercel without a blockchain backend. Use testnet or demo mode.

### Issue: Contract Calls Fail

**Solution**: Deploy contract to a public testnet and update RPC URL

---

## Quick Commands Reference

```powershell
# Git
git init
git add .
git commit -m "message"
git push origin main

# Vercel
vercel login
vercel                    # Deploy preview
vercel --prod            # Deploy production

# Hardhat
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

---

## 🎉 You're Done!

Your app is now live! Share your Vercel URL:
- Preview: `https://your-project-xxx.vercel.app`
- Production: `https://your-project.vercel.app`

**Share it on Twitter**: 
"Just deployed my privacy-first school admission system! 🎓✨ Built with @zama_fhe and blockchain. Check it out: [your-url]"

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Hardhat Docs: https://hardhat.org/docs
- Zama Docs: https://docs.zama.ai/

Good luck! 🚀
