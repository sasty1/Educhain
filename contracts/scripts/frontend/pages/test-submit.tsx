import { useState } from "react";
import { getSignerAndContract } from "../lib/contract";

export default function TestSubmitPage() {
  const [status, setStatus] = useState("");

  async function testSubmit() {
    setStatus("Testing...");
    
    try {
      const { contract, signer } = await getSignerAndContract();
      const address = await signer.getAddress();
      
      console.log("Your address:", address);
      console.log("Contract address:", await contract.getAddress());
      
      // Send simple bytes data
      const tx = await contract.submitEncryptedData(
        "0x0f",  // age 15
        "0x01",  // region 1
        "0x02",  // income 2
        "0x004b" // score 75
      );
      
      console.log("Transaction hash:", tx.hash);
      setStatus("Transaction sent: " + tx.hash);
      
      const receipt = await tx.wait();
      console.log("Receipt:", receipt);
      
      setStatus("✅ Success! Transaction confirmed in block " + receipt.blockNumber);
      
      // Now check if data was submitted
      const hasData = await contract.hasSubmittedData(address);
      console.log("Has submitted data:", hasData);
      
      if (hasData) {
        const eligible = await contract.getEncryptedEligibility(address);
        console.log("Is eligible:", eligible);
        setStatus("✅ Success! Has data: " + hasData + ", Eligible: " + eligible);
      }
      
    } catch (err: any) {
      console.error("Error:", err);
      setStatus("❌ Error: " + err.message);
    }
  }

  return (
    <main style={{ maxWidth: 600, padding: "2rem" }}>
      <h2>🧪 Test Submit</h2>
      <p>This is a simple test to submit data directly to the contract.</p>

      <button 
        onClick={testSubmit}
        style={{
          padding: "1rem 2rem",
          fontSize: "1rem",
          background: "#4fd1c5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "1rem"
        }}
      >
        Test Submit Data
      </button>

      {status && (
        <div style={{
          padding: "1rem",
          background: status.includes("✅") ? "#51cf6622" : "#ff6b6b22",
          borderRadius: "8px",
          marginTop: "1rem",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace"
        }}>
          {status}
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <a href="/" style={{ color: "#4fd1c5" }}>← Back to Home</a>
      </div>
    </main>
  );
}
