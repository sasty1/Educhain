# 🎓 Private School Eligibility System with FHE

A privacy-preserving school admission system built with **Fully Homomorphic Encryption (FHE)** using Zama's FHEVM. Student data remains encrypted throughout the entire process—from submission to eligibility computation on the blockchain.

## 🌟 Features

- **Complete Privacy**: All student data (age, region, income, exam scores) is encrypted in the browser
- **Encrypted Computation**: Smart contract checks eligibility on encrypted data without decryption
- **Secure Results**: Only the student can decrypt and view their eligibility status
- **Modern UI**: Beautiful, responsive interface built with Next.js
- **MetaMask Integration**: Seamless wallet connection

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Browser   │────────▶│  Smart       │────────▶│ FHE Gateway │
│  (Encrypt)  │         │  Contract    │         │  (Decrypt)  │
│             │◀────────│  (Compute)   │◀────────│             │
└─────────────┘         └──────────────┘         └─────────────┘
```

## 📋 Eligibility Criteria

The smart contract checks the following (all on encrypted data):

- **Age**: Between 5 and 18 years old
- **Income Bracket**: 1-3 (lower income families prioritized)
- **Exam Score**: Minimum 60 points
- **Region**: Any valid region code

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension
- Hardhat for smart contract development

### 🌐 Deployment Options

This project supports multiple deployment targets:

1. **Sepolia Testnet** (Recommended for production) - Ethereum testnet with real blockchain
2. **Local FHEVM** - For development with full FHE capabilities
3. **Custom FHEVM Network** - For production FHE deployment

**For Vercel/Production**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) and [VERCEL_SETUP.md](./VERCEL_SETUP.md)

### 1. Install Dependencies

```bash
# Install root dependencies (Hardhat)
npm install

# Install frontend dependencies
cd contracts/scripts/frontend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the frontend directory:

```bash
cd contracts/scripts/frontend
cp .env.example .env
```

Edit `.env` with your values:

```env
NEXT_PUBLIC_FHEVM_RPC=http://localhost:8545
NEXT_PUBLIC_FHE_GATEWAY=http://localhost:3002
NEXT_PUBLIC_CONTRACT_ADDRESS=<your_deployed_contract_address>
```

### 3. Start Local FHEVM Node

You need a local FHEVM node running. Follow [Zama's FHEVM documentation](https://docs.zama.ai/fhevm) to set up:

```bash
# In a separate terminal
# Follow Zama's setup instructions to start the local FHEVM node
```

### 4. Compile and Deploy Smart Contract

```bash
# From project root
npm run compile

# Deploy to local network
npm run deploy:local
```

**Important**: Copy the deployed contract address and update your `.env` file!

### 5. Run the Frontend

```bash
cd contracts/scripts/frontend
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 🌐 Deploy to Sepolia Testnet (Production)

### Quick Sepolia Setup

1. **Get Sepolia ETH**: Visit [sepoliafaucet.com](https://sepoliafaucet.com/)

2. **Configure Environment** (root `.env`):
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key
```

3. **Deploy Contract**:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

4. **Configure Frontend** (`contracts/scripts/frontend/.env.local`):
```env
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedAddress
```

5. **Deploy to Vercel**:
```bash
cd contracts/scripts/frontend
vercel --prod
```

6. **Add Environment Variables on Vercel**:
   - `NEXT_PUBLIC_NETWORK=sepolia`
   - `NEXT_PUBLIC_CONTRACT_ADDRESS=0xYour...Address`

**Full guide**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📁 Project Structure

```
private-school-fhe/
├── contracts/
│   ├── PrivateSchoolEligibility.sol    # Main FHE smart contract
│   └── scripts/
│       ├── deploy.ts                    # Deployment script
│       └── frontend/                    # Next.js application
│           ├── pages/
│           │   ├── index.tsx            # Home page
│           │   ├── apply.tsx            # Submit encrypted data
│           │   ├── check.tsx            # Check eligibility
│           │   ├── decrypt-eligibility.ts # API route for decryption
│           │   └── _app.tsx             # App wrapper
│           ├── lib/
│           │   ├── contract.ts          # Contract interaction
│           │   ├── fheClient.ts         # FHE encryption
│           │   └── types.ts             # TypeScript types
│           ├── abi/
│           │   └── PrivateSchoolEligibility.json
│           └── styles/
│               └── globals.css          # Global styles
├── hardhat.config.ts
├── package.json
└── README.md
```

## 🔧 Smart Contract Functions

### `submitEncryptedData()`

Submit encrypted student information:

```solidity
function submitEncryptedData(
    bytes calldata encryptedAge,
    bytes calldata encryptedRegion,
    bytes calldata encryptedIncome,
    bytes calldata encryptedScore
) external
```

### `getEncryptedEligibility()`

Retrieve encrypted eligibility result:

```solidity
function getEncryptedEligibility(address student) 
    external view returns (ebool)
```

### `hasSubmittedData()`

Check if a student has submitted data:

```solidity
function hasSubmittedData(address student) 
    external view returns (bool)
```

## 💻 Usage Flow

### For Students

1. **Connect Wallet**: Click to connect your MetaMask wallet
2. **Submit Application**: 
   - Enter your date of birth
   - Provide region code
   - Select income bracket (1-5)
   - Enter exam score
3. **Wait for Encryption**: Data is encrypted in your browser using FHE
4. **Submit to Blockchain**: Encrypted data is sent to the smart contract
5. **Check Eligibility**: Return later to decrypt and view your result

### For Developers

```typescript
// Encrypt data
import { encryptStudentInputs } from './lib/fheClient';

const encrypted = await encryptStudentInputs({
  age: 15,
  regionCode: 1,
  incomeBracket: 2,
  examScore: 75
});

// Submit to contract
const { contract } = await getSignerAndContract();
const tx = await contract.submitEncryptedData(
  encrypted.encAge,
  encrypted.encRegion,
  encrypted.encIncome,
  encrypted.encScore
);
await tx.wait();

// Check eligibility
const encryptedResult = await contract.getEncryptedEligibility(address);
// Decrypt via API route
const response = await fetch('/api/decrypt-eligibility', {
  method: 'POST',
  body: JSON.stringify({ encrypted: encryptedResult, requester: address })
});
```

## 🔐 Security Considerations

- **Private Keys**: Never commit private keys or sensitive data
- **Environment Variables**: Keep `.env` files out of version control
- **Gateway Security**: In production, implement proper authentication for the FHE Gateway
- **Access Control**: Only students can decrypt their own eligibility results

## 🧪 Testing

```bash
# Run smart contract tests
npm test

# Test specific contract
npx hardhat test test/PrivateSchoolEligibility.test.ts
```

## 📝 Development Notes

### Current Limitations

- **Mock Decryption**: The API route currently uses mock decryption. Integrate with real FHE Gateway for production.
- **ABI Generation**: After contract changes, regenerate ABI:
  ```bash
  npm run compile
  # Copy ABI from artifacts/ to frontend/abi/
  ```

### Next Steps

1. Integrate real FHE Gateway for decryption
2. Add comprehensive test suite
3. Implement admin dashboard
4. Add more eligibility criteria
5. Deploy to testnet/mainnet

## 🛠️ Troubleshooting

### "No wallet found" Error

- Install [MetaMask](https://metamask.io)
- Refresh the page after installation

### "Contract address not set" Warning

- Deploy the contract first
- Copy the address to `.env` file
- Restart the dev server

### TypeScript Errors

- Run `npm install` in both root and frontend directories
- Ensure all dependencies are installed

### FHEVM Connection Issues

- Verify FHEVM node is running
- Check `NEXT_PUBLIC_FHEVM_RPC` in `.env`
- Ensure MetaMask is connected to the correct network

## 📚 Resources

- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [fhevmjs Library](https://github.com/zama-ai/fhevmjs)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- **Zama** for the incredible FHEVM technology
- **Ethereum** community for the robust tooling
- **Next.js** team for the excellent framework

---

**Built with ❤️ using Fully Homomorphic Encryption**
