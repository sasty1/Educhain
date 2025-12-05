# 🚀 Deploy to Sepolia Testnet

## Step 1: Get Sepolia ETH (Free!)

1. Go to: https://sepoliafaucet.com/
2. Connect your MetaMask wallet
3. Request test ETH (you'll get ~0.5 SepoliaETH)
4. Wait 1-2 minutes for it to arrive

**Alternative faucets**:
- https://www.alchemy.com/faucets/ethereum-sepolia
- https://sepolia-faucet.pk910.de/

## Step 2: Get Your Private Key

⚠️ **IMPORTANT**: Never share your private key! This is for testnet only.

1. Open MetaMask
2. Click the 3 dots → Account Details
3. Click "Show Private Key"
4. Enter your password
5. Copy the private key

## Step 3: Get Alchemy RPC URL (Free)

1. Go to: https://www.alchemy.com/
2. Sign up for a free account
3. Create a new app:
   - Name: EduChain
   - Chain: Ethereum
   - Network: Sepolia
4. Click "View Key"
5. Copy the **HTTPS URL** (looks like: `https://eth-sepolia.g.alchemy.com/v2/abc123...`)

## Step 4: Create .env File

Create a `.env` file in the project root:

```bash
# In PowerShell
cd c:\Users\sokun\Documents\private-school-fhe
New-Item -Path .env -ItemType File
```

Add these lines to `.env`:

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=your_private_key_without_0x_prefix
```

**Example**:
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/abc123def456
PRIVATE_KEY=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd
```

## Step 5: Deploy Contract to Sepolia

```powershell
# Compile the contract
npx hardhat compile

# Deploy to Sepolia
npx hardhat run contracts/scripts/deploy.ts --network sepolia
```

**Expected output**:
```
Deploying contract with: 0xYourAddress
PrivateSchoolEligibility deployed to: 0x1234...5678
```

**⚠️ SAVE THIS ADDRESS!** You'll need it for Vercel.

## Step 6: Verify Contract on Etherscan (Optional)

Get an Etherscan API key from: https://etherscan.io/apis

Add to `.env`:
```env
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Verify:
```powershell
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

## Step 7: Update Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Click your **EduChain** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_FHEVM_RPC` | Your Alchemy Sepolia URL |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Your deployed contract address (0x...) |

**Example**:
- `NEXT_PUBLIC_FHEVM_RPC` = `https://eth-sepolia.g.alchemy.com/v2/abc123...`
- `NEXT_PUBLIC_CONTRACT_ADDRESS` = `0x1234567890123456789012345678901234567890`

5. Click **Save**

## Step 8: Redeploy on Vercel

```powershell
# Option 1: Push to GitHub (Vercel auto-deploys)
git add .
git commit -m "Add Sepolia network configuration"
git push origin main

# Option 2: Manual redeploy
cd contracts\scripts\frontend
vercel --prod
```

Or in Vercel Dashboard:
1. Go to **Deployments** tab
2. Click the **...** menu on latest deployment
3. Click **Redeploy**

## Step 9: Update Frontend .env.local

Update `contracts/scripts/frontend/.env.local`:

```env
NEXT_PUBLIC_FHEVM_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_FHE_GATEWAY=http://localhost:3002
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourSepoliaContractAddress
```

## Step 10: Test Your App!

1. Go to your Vercel URL: `https://educhain.vercel.app`
2. Connect MetaMask
3. **Switch to Sepolia network** in MetaMask
4. Try submitting an application
5. Check your eligibility

---

## 🎉 Success Checklist

- [ ] Got Sepolia ETH from faucet
- [ ] Created Alchemy account and got RPC URL
- [ ] Created `.env` file with private key and RPC URL
- [ ] Deployed contract to Sepolia
- [ ] Saved contract address
- [ ] Added environment variables to Vercel
- [ ] Redeployed on Vercel
- [ ] Tested on live site with Sepolia network

---

## 🔍 Troubleshooting

### "Insufficient funds" error
- Get more Sepolia ETH from faucets
- Wait a few minutes for faucet transaction to complete

### "Invalid private key" error
- Make sure private key has no `0x` prefix
- Check for extra spaces or quotes

### "Network not found" error
- Verify `SEPOLIA_RPC_URL` is correct
- Test the RPC URL in your browser (should return JSON)

### Contract call fails on Vercel
- Verify environment variables are set correctly
- Make sure you're connected to Sepolia in MetaMask
- Check contract address is correct

---

## 💰 Cost Estimate

- **Deployment**: ~0.01-0.05 SepoliaETH (FREE from faucets)
- **Each transaction**: ~0.001-0.005 SepoliaETH (FREE)
- **Alchemy**: FREE (up to 300M compute units/month)
- **Vercel**: FREE (for personal projects)

**Total cost: $0** 🎉

---

## 📚 Resources

- Sepolia Faucet: https://sepoliafaucet.com/
- Alchemy: https://www.alchemy.com/
- Sepolia Explorer: https://sepolia.etherscan.io/
- Hardhat Docs: https://hardhat.org/hardhat-runner/docs/guides/deploying

---

**Ready to deploy? Start with Step 1!** 🚀
