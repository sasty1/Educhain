import { useState } from "react";
import { BrowserProvider } from "ethers";

export default function DebugPage() {
  const [info, setInfo] = useState<any>(null);

  async function checkConnection() {
    try {
      const ethereum = (window as any).ethereum;
      
      if (!ethereum) {
        setInfo({ error: "MetaMask not found!" });
        return;
      }

      await ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(ethereum);
      const network = await provider.getNetwork();
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      setInfo({
        connected: true,
        network: {
          name: network.name,
          chainId: network.chainId.toString(),
        },
        account: address,
        balance: balance.toString() + " wei",
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        expectedChainId: "31337",
        isCorrectNetwork: network.chainId.toString() === "31337",
      });
    } catch (err: any) {
      setInfo({ error: err.message });
    }
  }

  return (
    <main style={{ maxWidth: 800, padding: "2rem" }}>
      <h2>🔍 Debug Information</h2>
      <p>Click the button to check your connection status.</p>

      <button 
        onClick={checkConnection}
        style={{
          padding: "1rem 2rem",
          fontSize: "1rem",
          background: "#4fd1c5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "2rem"
        }}
      >
        Check Connection
      </button>

      {info && (
        <div style={{
          background: "#1a1a2e",
          padding: "1.5rem",
          borderRadius: "8px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap"
        }}>
          {info.error ? (
            <div style={{ color: "#ff6b6b" }}>
              <strong>❌ Error:</strong> {info.error}
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "1rem" }}>
                <strong style={{ color: "#4fd1c5" }}>✅ Connected!</strong>
              </div>
              
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Network:</strong> {info.network.name}
              </div>
              
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Chain ID:</strong> {info.network.chainId}
                {info.isCorrectNetwork ? (
                  <span style={{ color: "#51cf66", marginLeft: "1rem" }}>✅ Correct!</span>
                ) : (
                  <span style={{ color: "#ff6b6b", marginLeft: "1rem" }}>
                    ❌ Should be 31337 (Localhost)
                  </span>
                )}
              </div>
              
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Your Address:</strong> {info.account}
              </div>
              
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Balance:</strong> {info.balance}
              </div>
              
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Contract Address:</strong> {info.contractAddress}
              </div>

              {!info.isCorrectNetwork && (
                <div style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  background: "#ff6b6b22",
                  borderRadius: "8px",
                  color: "#ff6b6b"
                }}>
                  <strong>⚠️ Wrong Network!</strong>
                  <p style={{ marginTop: "0.5rem" }}>
                    You need to switch MetaMask to <strong>Localhost 8545</strong> (Chain ID: 31337)
                  </p>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                    1. Open MetaMask<br/>
                    2. Click the network dropdown at the top<br/>
                    3. Select "Localhost 8545"<br/>
                    4. Refresh this page
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <a href="/" style={{ color: "#4fd1c5" }}>← Back to Home</a>
      </div>
    </main>
  );
}
