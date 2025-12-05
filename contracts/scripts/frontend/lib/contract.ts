import { BrowserProvider, Contract } from "ethers";
import abi from "../abi/PrivateSchoolEligibility.json";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "0x0000000000000000000000000000000000000000";

/**
 * Connect to MetaMask wallet and get contract instance
 * @returns Provider, signer, and contract instance
 * @throws Error if wallet not found or connection fails
 */
export async function getSignerAndContract() {
  const ethereum = (window as any).ethereum;

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
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);

    // Verify contract address is set
    if (CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
      console.warn(
        "⚠️ Contract address not set. Please deploy the contract and update .env"
      );
    }

    return { provider, signer, contract };
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error("Connection rejected. Please approve the connection request.");
    }
    throw new Error(`Failed to connect to wallet: ${error.message}`);
  }
}

/**
 * Check if MetaMask is installed
 */
export function isMetaMaskInstalled(): boolean {
  return typeof window !== "undefined" && !!(window as any).ethereum;
}

/**
 * Get the current connected account address
 */
export async function getCurrentAccount(): Promise<string | null> {
  if (!isMetaMaskInstalled()) return null;

  try {
    const { signer } = await getSignerAndContract();
    return await signer.getAddress();
  } catch {
    return null;
  }
}
