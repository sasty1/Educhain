# ⚡ Quick Deploy Guide

## 🚀 Deploy in 5 Minutes!

### Step 1: Push to GitHub (2 minutes)

```powershell
# Open PowerShell in your project folder
cd c:\Users\sokun\Documents\private-school-fhe

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: EduChain - Privacy-first school admission system"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/private-school-fhe.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel (3 minutes)

#### Option A: One-Click Deploy (Easiest!)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Configure:
   - **Root Directory**: `contracts/scripts/frontend`
   - **Framework**: Next.js (auto-detected)
5. Click "Deploy"
6. Wait 2-3 minutes ☕
7. Done! You'll get a URL like: `https://your-project.vercel.app`

#### Option B: Using CLI

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Go to frontend folder
cd contracts\scripts\frontend

# Deploy
vercel --prod
```

### Step 3: Important Notes ⚠️

**Your Vercel deployment will be UI-only** because:
- Hardhat blockchain node won't run on Vercel
- Smart contract needs a separate blockchain network

**For demo purposes**, the UI will work but wallet interactions won't connect to a real blockchain.

### Step 4: Make it Fully Functional (Optional)

To make it work with real blockchain:

1. **Deploy contract to Sepolia testnet**:
```powershell
# Get Sepolia ETH from https://sepoliafaucet.com/
# Update hardhat.config.js with Sepolia network
npx hardhat run scripts/deploy.js --network sepolia
```

2. **Add environment variables in Vercel**:
   - Go to Project Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_FHEVM_RPC` = `https://sepolia.infura.io/v3/YOUR_KEY`
     - `NEXT_PUBLIC_CONTRACT_ADDRESS` = `0x...` (your deployed address)

3. **Redeploy**:
```powershell
vercel --prod
```

---

## 📱 Share Your Project!

Once deployed, share on Twitter:

```
Just launched EduChain! 🎓✨

A privacy-first school admission system powered by blockchain and FHE.

✅ Point-based scoring (100 points)
✅ Equity-focused (income-based)
✅ Ages 5-65 supported
✅ Beautiful modern UI

Check it out: [your-vercel-url]

Built with @zama_fhe 🔐

#Web3 #Blockchain #Privacy #Education
```

---

## 🎯 Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel deployment successful
- [ ] Website loads correctly
- [ ] Shared on Twitter
- [ ] Added to portfolio

---

## 🆘 Need Help?

**Deployment fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify root directory is set correctly

**Want full blockchain functionality?**
- See DEPLOYMENT_GUIDE.md for detailed instructions
- Deploy contract to testnet
- Configure environment variables

---

**You're all set! 🎉**

Your project is now live and ready to showcase!
