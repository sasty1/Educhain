import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";

interface WalletRequiredProps {
  children: React.ReactNode;
}

export default function WalletRequired({ children }: WalletRequiredProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new BrowserProvider((window as any).ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = await accounts[0].getAddress();
          setAccount(address);
        }
      } catch (err) {
        console.error("Error checking connection:", err);
      }
    }
    setIsChecking(false);
  }

  async function connectWallet() {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask to use this application!");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setIsConnecting(true);
    try {
      const provider = new BrowserProvider((window as any).ethereum);
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

  if (isChecking) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000"
      }}>
        <div style={{ textAlign: "center", color: "#10b981" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔄</div>
          <div>Checking wallet connection...</div>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background Pattern */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            rgba(16, 185, 129, 0.3) 50px,
            rgba(16, 185, 129, 0.3) 51px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(16, 185, 129, 0.3) 50px,
            rgba(16, 185, 129, 0.3) 51px
          )`
        }} />

        {/* Content */}
        <div style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "600px",
          padding: "3rem"
        }}>
          {/* Icon */}
          <div style={{
            fontSize: "6rem",
            marginBottom: "2rem",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
            width: "200px",
            height: "200px",
            margin: "0 auto 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%"
          }}>
            🎓
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold"
          }}>
            EduChain
          </h1>

          <h2 style={{
            fontSize: "1.5rem",
            color: "#10b981",
            marginBottom: "1rem",
            fontWeight: "normal"
          }}>
            "Private School Admission"
          </h2>

          <p style={{
            color: "#9ca3af",
            fontSize: "1.1rem",
            marginBottom: "3rem",
            lineHeight: "1.6"
          }}>
            A privacy-first admission platform powered by blockchain technology.
            Connect your wallet to get started.
          </p>

          {/* Connect Button */}
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            style={{
              padding: "1.25rem 3rem",
              background: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: isConnecting ? "not-allowed" : "pointer",
              opacity: isConnecting ? 0.7 : 1,
              transition: "all 0.3s",
              fontSize: "1.1rem",
              boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)"
            }}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>

          {/* Info */}
          <div style={{
            marginTop: "3rem",
            padding: "1.5rem",
            background: "rgba(16, 185, 129, 0.05)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            borderRadius: "12px",
            textAlign: "left"
          }}>
            <h3 style={{ color: "#10b981", marginBottom: "1rem", fontSize: "1.1rem" }}>
              Before You Start
            </h3>
            <ul style={{ color: "#9ca3af", lineHeight: "1.8", paddingLeft: "1.5rem" }}>
              <li>Install MetaMask browser extension</li>
              <li>Connect to the network</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
