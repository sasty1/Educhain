import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { Brain } from "lucide-react";

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
      background: "rgba(0, 0, 0, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(16, 185, 129, 0.2)",
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
          gap: "0.5rem",
          textDecoration: "none",
          color: "#10b981",
          fontSize: "1.25rem",
          fontWeight: "600"
        }}>
          <Brain style={{ width: "32px", height: "32px", strokeWidth: 1.5 }} />
        </a>

        {/* Navigation */}
        <nav style={{
          display: "flex",
          gap: "2.5rem",
          alignItems: "center",
          flex: 1,
          justifyContent: "center"
        }}>
          <a href="/" style={{ 
            color: "#10b981", 
            textDecoration: "none", 
            transition: "color 0.3s",
            fontSize: "0.95rem",
            fontWeight: "500"
          }}>
            Home
          </a>
          <a href="/apply-enhanced" style={{ 
            color: "#9ca3af", 
            textDecoration: "none", 
            transition: "color 0.3s",
            fontSize: "0.95rem",
            fontWeight: "500"
          }}>
            Student
          </a>
          <a href="/check-enhanced" style={{ 
            color: "#9ca3af", 
            textDecoration: "none", 
            transition: "color 0.3s",
            fontSize: "0.95rem",
            fontWeight: "500"
          }}>
            Researcher
          </a>
          <a href="/docs" style={{ 
            color: "#9ca3af", 
            textDecoration: "none", 
            transition: "color 0.3s",
            fontSize: "0.95rem",
            fontWeight: "500"
          }}>
            School
          </a>
          <a href="/docs" style={{ 
            color: "#9ca3af", 
            textDecoration: "none", 
            transition: "color 0.3s",
            fontSize: "0.95rem",
            fontWeight: "500"
          }}>
            Docs
          </a>
        </nav>

        {/* Connect Wallet Button */}
        {!account ? (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            style={{
              padding: "0.625rem 1.75rem",
              background: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: isConnecting ? "not-allowed" : "pointer",
              opacity: isConnecting ? 0.7 : 1,
              transition: "all 0.3s",
              fontSize: "0.875rem"
            }}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          <div style={{
            padding: "0.625rem 1.5rem",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "6px",
            color: "#10b981",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem"
          }}>
            <span style={{ 
              width: "6px", 
              height: "6px", 
              background: "#10b981", 
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
