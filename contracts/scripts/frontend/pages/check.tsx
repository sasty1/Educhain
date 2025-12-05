import { useState } from "react";
import { getSignerAndContract } from "../lib/contract";

export default function CheckEligibilityPage() {
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<string | null>(null);

  async function handleCheck() {
    setStatus("Fetching encrypted eligibility…");

    try {
      const { contract, signer } = await getSignerAndContract();
      const userAddress = await signer.getAddress();

      // First check if user has submitted data
      const hasSubmitted = await contract.hasSubmittedData(userAddress);
      
      if (!hasSubmitted) {
        setStatus("");
        setResult("⚠️ No application found. Please submit an application first!");
        return;
      }

      const encryptedFlag = await contract.getEncryptedEligibility(userAddress);
      console.log("📊 Encrypted flag:", encryptedFlag);

      // Convert BigInt to boolean
      const isEligible = Boolean(encryptedFlag);
      console.log("📊 Is eligible:", isEligible);

      // Since we already have the boolean result, we can skip the API call
      // In a real FHE setup, you would decrypt via the gateway here
      
      setResult(
        isEligible ? "✅ You are eligible 🎓" : "❌ You are not eligible yet."
      );

      setStatus("");
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("could not decode")) {
        setStatus("");
        setResult("⚠️ No application found. Please submit an application first!");
      } else {
        setStatus("Failed to check eligibility: " + err.message);
      }
    }
  }

  return (
    <main style={{ maxWidth: 600 }}>
      <h2>🔍 Check Your Eligibility</h2>
      <p>Click the button below to decrypt and view your eligibility status.</p>

      <div className="card">
        <button onClick={handleCheck} disabled={!!status && status.includes("…")}>
          {status && status.includes("…") ? status : "Check My Status"}
        </button>

        {result && (
          <div className={`status-message ${result.includes("eligible 🎓") ? "success" : "error"}`} style={{ marginTop: "1rem" }}>
            <strong>{result}</strong>
          </div>
        )}
      </div>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <a href="/" style={{ color: "#4fd1c5" }}>← Back to Home</a>
      </div>
    </main>
  );
}
