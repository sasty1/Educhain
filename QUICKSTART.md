# 🚀 Quick Start Guide

Get your Private School Eligibility System running in 5 minutes!

## Step 1: Install Dependencies (2 min)

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd contracts/scripts/frontend
npm install
cd ../../..
```

## Step 2: Set Up Environment (1 min)

```bash
cd contracts/scripts/frontend

# Copy the example env file
cp .env.example .env.local

# Edit .env.local (you'll update CONTRACT_ADDRESS later)
```

## Step 3: Start FHEVM Node (Optional)

For full FHE functionality, you need a local FHEVM node. For now, you can skip this and use a regular local Ethereum node for testing.

```bash
# Option A: Use Hardhat's built-in node (simple, for testing)
npx hardhat node

# Option B: Use FHEVM node (advanced, for real FHE)
# Follow: https://docs.zama.ai/fhevm
```

## Step 4: Deploy Contract (1 min)

```bash
# In a new terminal, from project root
npm run deploy:local
```

**Important**: Copy the deployed contract address from the output!

Example output:
```
PrivateSchoolEligibility deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Update your `.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## Step 5: Run Frontend (1 min)

```bash
cd contracts/scripts/frontend
npm run dev
```

Visit **http://localhost:3000** 🎉

## Testing the Application

### Connect MetaMask

1. Open MetaMask
2. Add local network:
   - Network Name: `Localhost 8545`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337` (or `1337` for FHEVM)
   - Currency: `ETH`

3. Import a test account (if using Hardhat node):
   - Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - This account has test ETH

### Submit Application

1. Click "Submit Your Application"
2. Fill in the form:
   - **Date of Birth**: Any date that makes you 5-18 years old
   - **Region Code**: Any number (e.g., `1`)
   - **Income Bracket**: 1-3 (to be eligible)
   - **Exam Score**: 60+ (to be eligible)

3. Click "Submit Encrypted Data"
4. Approve the MetaMask transaction

### Check Eligibility

1. Go back to home
2. Click "Check Your Eligibility"
3. Click "Check My Status"
4. View your result!

## Troubleshooting

### "No wallet found"
- Install MetaMask: https://metamask.io

### "Contract address not set"
- Make sure you deployed the contract
- Copy the address to `.env.local`
- Restart the dev server

### Transaction fails
- Make sure your MetaMask is on the correct network
- Ensure you have test ETH in your account

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

## Next Steps

- Read the full [README.md](./README.md)
- Explore the smart contract code
- Customize eligibility criteria
- Add more features!

## Need Help?

Check the main README.md for:
- Detailed architecture
- API documentation
- Development guide
- Security considerations

Happy coding! 🎓✨
