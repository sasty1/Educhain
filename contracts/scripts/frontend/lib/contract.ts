import { BrowserProvider, Contract, Network } from "ethers";
import abi from "../abi/PrivateSchoolEligibility.json";

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on?: (event: string, callback: (...args: any[]) => void) => void;
      removeListener?: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "0x0000000000000000000000000000000000000000";

// Network configuration
const NETWORK_ENV = process.env.NEXT_PUBLIC_NETWORK || "local"; // 'local', 'sepolia', or 'fhevm'

// Network configurations
const NETWORKS = {
  local: {
    chainId: "0x1f49", // 8009 in hex (local FHEVM)
    rpcUrl: "http://localhost:8545",
    name: "FHEVM Local",
    nativeCurrency: {
      name: "ZAMA",
      symbol: "ZAMA",
      decimals: 18,
    },
  },
  sepolia: {
    chainId: "0xaa36a7", // 11155111 in hex
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/demo",
    name: "Sepolia Testnet",
    nativeCurrency: {
      name: "Sepolia ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorer: "https://sepolia.etherscan.io",
  },
  fhevm: {
    chainId: process.env.NEXT_PUBLIC_FHEVM_CHAIN_ID || "0x1f49",
    rpcUrl: process.env.NEXT_PUBLIC_FHEVM_RPC || "http://localhost:8545",
    name: "FHEVM Network",
    nativeCurrency: {
      name: "ZAMA",
      symbol: "ZAMA",
      decimals: 18,
    },
  },
};

// Get current network config
const CURRENT_NETWORK = NETWORKS[NETWORK_ENV as keyof typeof NETWORKS] || NETWORKS.local;
const TARGET_CHAIN_ID = CURRENT_NETWORK.chainId;
const TARGET_RPC_URL = CURRENT_NETWORK.rpcUrl;
const NETWORK_NAME = CURRENT_NETWORK.name;

/**
 * Connect to MetaMask wallet and get contract instance
 * @returns Provider, signer, and contract instance
 * @throws Error if wallet not found or connection fails
 */
export async function getSignerAndContract() {
  const ethereum = window.ethereum;

  if (!ethereum) {
    throw new Error(
      "No Ethereum wallet found. Please install MetaMask from https://metamask.io"
    );
  }

  try {
    // Request account access
    await ethereum.request({ method: "eth_requestAccounts" });

    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    
    // Verify contract address is set
    if (CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
      console.warn(
        "⚠️ Contract address not set. Please deploy the contract and update .env"
      );
      throw new Error("Contract address not configured. Please update NEXT_PUBLIC_CONTRACT_ADDRESS in .env");
    }

    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);

    // Check if we're on the correct network
    const network = await provider.getNetwork();
    const currentChainId = "0x" + network.chainId.toString(16);
    
    if (currentChainId !== TARGET_CHAIN_ID) {
      console.warn(
        `⚠️ Wrong network. Expected ${NETWORK_NAME} (${TARGET_CHAIN_ID}), got: ${currentChainId}`
      );
      // Note: Don't throw here, let the user switch manually or call switchToTargetNetwork()
    }

    return { provider, signer, contract };
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error("Connection rejected. Please approve the connection request.");
    }
    if (error.message?.includes("Contract address")) {
      throw error; // Re-throw contract address errors
    }
    throw new Error(`Failed to connect to wallet: ${error.message}`);
  }
}

/**
 * Check if MetaMask is installed
 */
export function isMetaMaskInstalled(): boolean {
  return typeof window !== "undefined" && !!window.ethereum?.isMetaMask;
}

/**
 * Switch to target network or add it if not present
 */
export async function switchToTargetNetwork(): Promise<void> {
  const ethereum = window.ethereum;
  
  if (!ethereum) {
    throw new Error("MetaMask not installed");
  }

  try {
    // Try to switch to the network
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: TARGET_CHAIN_ID }],
    });
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (error.code === 4902) {
      // For Sepolia, it's usually already in MetaMask, so this shouldn't happen
      // But for custom networks like FHEVM, we need to add it
      if (NETWORK_ENV === 'sepolia') {
        throw new Error("Sepolia network not found in MetaMask. Please add it manually.");
      }
      
      try {
        const networkParams: any = {
          chainId: TARGET_CHAIN_ID,
          chainName: NETWORK_NAME,
          rpcUrls: [TARGET_RPC_URL],
          nativeCurrency: CURRENT_NETWORK.nativeCurrency,
        };

        // Add block explorer if available
        if ('blockExplorer' in CURRENT_NETWORK) {
          networkParams.blockExplorerUrls = [(CURRENT_NETWORK as any).blockExplorer];
        }

        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkParams],
        });
      } catch (addError: any) {
        throw new Error(`Failed to add ${NETWORK_NAME}: ${addError.message}`);
      }
    } else {
      throw new Error(`Failed to switch to ${NETWORK_NAME}: ${error.message}`);
    }
  }
}

/**
 * Legacy function name for backward compatibility
 */
export const switchToFHEVMNetwork = switchToTargetNetwork;

/**
 * Get current network information
 */
export async function getCurrentNetwork(): Promise<{
  chainId: string;
  name: string;
  isCorrectNetwork: boolean;
  targetNetwork: string;
}> {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask not installed");
  }

  const ethereum = window.ethereum!;
  const chainId = await ethereum.request({ method: "eth_chainId" });
  const isCorrectNetwork = chainId === TARGET_CHAIN_ID;

  // Get network name from chain ID
  let networkName = "Unknown Network";
  if (isCorrectNetwork) {
    networkName = NETWORK_NAME;
  } else {
    // Try to identify common networks
    const knownNetworks: Record<string, string> = {
      "0x1": "Ethereum Mainnet",
      "0xaa36a7": "Sepolia Testnet",
      "0x5": "Goerli Testnet",
      "0x89": "Polygon Mainnet",
      "0x1f49": "FHEVM Local",
    };
    networkName = knownNetworks[chainId] || `Unknown (${chainId})`;
  }

  return {
    chainId,
    name: networkName,
    isCorrectNetwork,
    targetNetwork: NETWORK_NAME,
  };
}

/**
 * Get network configuration
 */
export function getNetworkConfig() {
  return {
    environment: NETWORK_ENV,
    chainId: TARGET_CHAIN_ID,
    rpcUrl: TARGET_RPC_URL,
    name: NETWORK_NAME,
    contractAddress: CONTRACT_ADDRESS,
  };
}

/**
 * Get the current connected account address
 */
export async function getCurrentAccount(): Promise<string | null> {
  if (!isMetaMaskInstalled()) {
    console.warn("MetaMask not installed");
    return null;
  }

  try {
    const { signer } = await getSignerAndContract();
    return await signer.getAddress();
  } catch (error: any) {
    console.error("Failed to get current account:", error.message);
    return null;
  }
}

/**
 * Listen for account changes
 */
export function onAccountsChanged(callback: (accounts: string[]) => void): () => void {
  const ethereum = window.ethereum;
  
  if (!ethereum?.on) {
    console.warn("MetaMask event listeners not available");
    return () => {};
  }

  ethereum.on("accountsChanged", callback);
  
  // Return cleanup function
  return () => {
    if (ethereum.removeListener) {
      ethereum.removeListener("accountsChanged", callback);
    }
  };
}

/**
 * Listen for network changes
 */
export function onChainChanged(callback: (chainId: string) => void): () => void {
  const ethereum = window.ethereum;
  
  if (!ethereum?.on) {
    console.warn("MetaMask event listeners not available");
    return () => {};
  }

  ethereum.on("chainChanged", callback);
  
  // Return cleanup function
  return () => {
    if (ethereum.removeListener) {
      ethereum.removeListener("chainChanged", callback);
    }
  };
}
