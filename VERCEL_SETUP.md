# ⚡ Quick Vercel Setup for Sepolia

## Step-by-Step Vercel Configuration

### 1. Environment Variables on Vercel

Go to your Vercel project → **Settings** → **Environment Variables**

Add these variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `NEXT_PUBLIC_NETWORK` | `sepolia` | Network to use |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | `0xYour...Address` | Your deployed contract address |

### 2. How Users Will Connect

When users visit your Vercel app:

1. They click "Connect Wallet"
2. MetaMask opens
3. **If they're on wrong network**, your app will show a warning
4. They can click "Switch to Sepolia" button (uses `switchToTargetNetwork()`)
5. MetaMask will prompt them to switch networks
6. Once on Sepolia, they can interact with your contract

### 3. Testing Your Deployment

After deploying:

1. Visit your Vercel URL
2. Open browser console (F12)
3. Click "Connect Wallet"
4. Check console for network info
5. Try switching to Sepolia
6. Test submitting an application

### 4. Common Issues

**Issue**: "Wrong network" warning
- **Solution**: Click the "Switch to Sepolia" button in your app

**Issue**: "Contract address not set"
- **Solution**: Add `NEXT_PUBLIC_CONTRACT_ADDRESS` in Vercel environment variables

**Issue**: Transactions fail
- **Solution**: Make sure you have Sepolia ETH in your wallet

### 5. Get Sepolia ETH for Testing

Users need Sepolia ETH to interact with your app:
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia
- https://faucet.quicknode.com/ethereum/sepolia

### 6. Vercel Deployment Commands

```powershell
# Deploy from frontend folder
cd contracts\scripts\frontend

# Preview deployment
vercel

# Production deployment
vercel --prod
```

### 7. Update After Changes

```powershell
# Make your code changes
# Then commit and push
git add .
git commit -m "Update message"
git push origin main

# Vercel auto-deploys! ✨
# Or manually:
vercel --prod
```

### 8. Monitor Your App

- **Vercel Dashboard**: See deployment logs and analytics
- **Etherscan**: Monitor contract interactions at https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS

---

## 🎯 Quick Checklist

Before sharing your app:

- [ ] Contract deployed to Sepolia
- [ ] Contract address added to Vercel env vars
- [ ] `NEXT_PUBLIC_NETWORK=sepolia` set on Vercel
- [ ] Tested wallet connection on live site
- [ ] Tested network switching
- [ ] Tested application submission
- [ ] Verified transactions on Sepolia Etherscan

---

## 📱 Share Your App

Your app is live at: `https://your-project.vercel.app`

**Sample Tweet**:
```
🎓 Just deployed my blockchain-based school admission system!

✅ Privacy-first with encryption
✅ Fair point-based eligibility
✅ Live on Sepolia testnet

Try it out: [your-vercel-url]

Built with @nextjs @etherscan #Web3 #Blockchain
```

---

**Need help?** Check the full [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
