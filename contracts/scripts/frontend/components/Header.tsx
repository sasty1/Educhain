import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";

export default function Header() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = await accounts[0].getAddress();
          setAccount(address);
        }
      } catch (err) {
        console.error("Error checking connection:", err);
      }
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask to use this application!");
      return;
    }

    setIsConnecting(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (err: any) {
      console.error("Error connecting wallet:", err);
      alert("Failed to connect wallet: " + err.message);
    } finally {
      setIsConnecting(false);
    }
  }

  function formatAddress(addr: string) {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: "rgba(10, 10, 30, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(79, 209, 197, 0.2)",
      padding: "1rem 2rem"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        {/* Logo */}
        <a href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          textDecoration: "none",
          color: "#4fd1c5",
          fontSize: "1.5rem",
          fontWeight: "bold"
        }}>
          <span style={{ fontSize: "2rem" }}>🎓</span>
          <span>EduChain</span>
        </a>

        {/* Navigation */}
        <nav style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center"
        }}>
          <a href="/" style={{ color: "#e0e0e0", textDecoration: "none", transition: "color 0.3s" }}>
            Home
          </a>
          <a href="/apply-enhanced" style={{ color: "#e0e0e0", textDecoration: "none", transition: "color 0.3s" }}>
            Apply
          </a>
          <a href="/check-enhanced" style={{ color: "#e0e0e0", textDecoration: "none", transition: "color 0.3s" }}>
            Check Status
          </a>
          <a href="/docs" style={{ color: "#e0e0e0", textDecoration: "none", transition: "color 0.3s" }}>
            Docs
          </a>
        </nav>

        {/* Connect Wallet Button */}
        {!account ? (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(135deg, #00e6a0 0%, #00b380 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: isConnecting ? "not-allowed" : "pointer",
              opacity: isConnecting ? 0.7 : 1,
              transition: "all 0.3s",
              fontSize: "0.95rem"
            }}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          <div style={{
            padding: "0.75rem 1.5rem",
            background: "rgba(79, 209, 197, 0.1)",
            border: "1px solid #4fd1c5",
            borderRadius: "8px",
            color: "#4fd1c5",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <span style={{ 
              width: "8px", 
              height: "8px", 
              background: "#00e6a0", 
              borderRadius: "50%",
              display: "inline-block"
            }} />
            {formatAddress(account)}
          </div>
        )}
      </div>
    </header>
  );
}
