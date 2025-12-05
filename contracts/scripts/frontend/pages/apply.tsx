import { useState } from "react";
import { encryptStudentInputs } from "../lib/fheClient";
import { getSignerAndContract } from "../lib/contract";

export default function ApplyPage() {
  const [dob, setDob] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [incomeBracket, setIncomeBracket] = useState("");
  const [examScore, setExamScore] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Encrypting and submitting…");

    try {
      const birthYear = new Date(dob).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      console.log("📊 Form data:", { age, regionCode, incomeBracket, examScore });

      const encrypted = await encryptStudentInputs({
        age,
        regionCode: Number(regionCode),
        incomeBracket: Number(incomeBracket),
        examScore: Number(examScore)
      });

      console.log("🔐 Encrypted data:", encrypted);

      const { contract } = await getSignerAndContract();
      console.log("📝 Contract address:", await contract.getAddress());

      setStatus("Sending transaction...");
      
      const tx = await contract.submitEncryptedData(
        encrypted.encAge,
        encrypted.encRegion,
        encrypted.encIncome,
        encrypted.encScore
      );

      console.log("📤 Transaction sent:", tx.hash);
      setStatus("Waiting for confirmation...");

      const receipt = await tx.wait();
      console.log("✅ Transaction confirmed:", receipt);

      setStatus("✅ Submitted successfully! You can now check your eligibility.");
    } catch (err: any) {
      console.error("❌ Error:", err);
      setStatus("❌ Error: " + (err.message || "Failed to submit data"));
    }
  }

  return (
    <main style={{ maxWidth: 600 }}>
      <h2>📝 Submit Your Application</h2>
      <p>Your data is encrypted in your browser before being sent to the blockchain.</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label>
          Date of birth
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </label>

        <label>
          Region code
          <input
            type="number"
            value={regionCode}
            onChange={(e) => setRegionCode(e.target.value)}
            required
          />
        </label>

        <label>
          Income bracket (1 - 5)
          <input
            type="number"
            value={incomeBracket}
            min={1}
            max={5}
            onChange={(e) => setIncomeBracket(e.target.value)}
            required
          />
        </label>

        <label>
          Exam score
          <input
            type="number"
            value={examScore}
            min={0}
            onChange={(e) => setExamScore(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={!dob || !regionCode || !incomeBracket || !examScore}>
          🔒 Submit Encrypted Data
        </button>
      </form>

      {status && (
        <div className={`status-message ${status.includes("success") ? "success" : ""}`}>
          {status}
        </div>
      )}

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <a href="/" style={{ color: "#4fd1c5" }}>← Back to Home</a>
      </div>
    </main>
  );
}
