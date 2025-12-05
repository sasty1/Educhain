import { useState, useEffect } from "react";
import { getSignerAndContract } from "../lib/contract";
import Footer from "../components/Footer";

export default function ApplyEnhancedPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [incomeBracket, setIncomeBracket] = useState("");
  const [examScore, setExamScore] = useState("");
  const [extracurricular, setExtracurricular] = useState("");
  const [interview, setInterview] = useState("");
  const [status, setStatus] = useState("");
  const [estimatedPoints, setEstimatedPoints] = useState<number | null>(null);

  // Calculate estimated points as user fills form
  function calculateEstimatedPoints() {
    let points = 0;
    
    if (dob) {
      const age = new Date().getFullYear() - new Date(dob).getFullYear();
      if (age >= 10 && age <= 18) points += 20;
      else if (age >= 19 && age <= 30) points += 15;
      else if (age >= 31 && age <= 50) points += 10;
      else if (age >= 5 && age <= 9) points += 15;
      else if (age >= 51 && age <= 65) points += 10;
    }
    
    const score = Number(examScore);
    if (score >= 90) points += 40;
    else if (score >= 80) points += 30;
    else if (score >= 70) points += 20;
    else if (score >= 60) points += 10;
    
    const income = Number(incomeBracket);
    if (income === 1) points += 20;
    else if (income === 2) points += 15;
    else if (income === 3) points += 10;
    else if (income <= 5) points += 5;
    
    points += Number(extracurricular) || 0;
    points += Number(interview) || 0;
    
    return points;
  }

  // Update estimated points whenever form changes
  function handleFormChange() {
    const points = calculateEstimatedPoints();
    setEstimatedPoints(points);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Submitting application...");

    try {
      const birthYear = new Date(dob).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      const { contract } = await getSignerAndContract();

      const tx = await contract.submitApplication(
        fullName,
        email,
        age,
        Number(regionCode),
        Number(incomeBracket),
        Number(examScore),
        Number(extracurricular),
        Number(interview)
      );

      setStatus("Waiting for confirmation...");
      await tx.wait();

      setStatus("✅ Application submitted successfully! You can now check your eligibility.");
    } catch (err: any) {
      console.error("❌ Error:", err);
      setStatus("❌ Error: " + (err.message || "Failed to submit application"));
    }
  }

  return (
    <main style={{ maxWidth: 900, padding: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          🎓 School Admission Application
        </h1>
        <p style={{ color: "#a0aec0", fontSize: "1.1rem" }}>
          Complete your application with our privacy-first point-based system
        </p>
      </div>

      {estimatedPoints !== null && (
        <div style={{
          background: estimatedPoints >= 70 ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          textAlign: "center",
          color: "white"
        }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "0.5rem" }}>
            Estimated Score
          </div>
          <div style={{ fontSize: "3rem", fontWeight: "bold" }}>
            {estimatedPoints}/100
          </div>
          <div style={{ fontSize: "0.9rem", opacity: 0.9, marginTop: "0.5rem" }}>
            {estimatedPoints >= 70 ? "✅ Likely Eligible" : "⚠️ Below Passing Score (70)"}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} onChange={handleFormChange}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          {/* Personal Information Section */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <h3 style={{ marginBottom: "1rem", color: "#4fd1c5" }}>
              📋 Personal Information
            </h3>
            
            <label style={{ display: "block", marginBottom: "1rem" }}>
              Full Name *
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                style={{ marginTop: "0.5rem" }}
              />
            </label>

            <label style={{ display: "block", marginBottom: "1rem" }}>
              Email Address *
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
                style={{ marginTop: "0.5rem" }}
              />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <label>
                Date of Birth *
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  style={{ marginTop: "0.5rem" }}
                />
              </label>

              <label>
                Region Code *
                <input
                  type="number"
                  value={regionCode}
                  onChange={(e) => setRegionCode(e.target.value)}
                  placeholder="e.g., 1001"
                  required
                  style={{ marginTop: "0.5rem" }}
                />
              </label>
            </div>
          </div>

          {/* Academic Performance */}
          <div className="card">
            <h3 style={{ marginBottom: "1rem", color: "#4fd1c5" }}>
              📚 Academic Performance
            </h3>
            
            <label style={{ display: "block", marginBottom: "1rem" }}>
              Entrance Exam Score (0-100) *
              <div style={{ fontSize: "0.85rem", color: "#a0aec0", marginTop: "0.25rem" }}>
                90+: 40pts | 80-89: 30pts | 70-79: 20pts | 60-69: 10pts
              </div>
              <input
                type="number"
                value={examScore}
                onChange={(e) => setExamScore(e.target.value)}
                min={0}
                max={100}
                placeholder="85"
                required
                style={{ marginTop: "0.5rem" }}
              />
            </label>

            <label style={{ display: "block" }}>
              Extracurricular Score (0-10) *
              <div style={{ fontSize: "0.85rem", color: "#a0aec0", marginTop: "0.25rem" }}>
                Sports, arts, clubs, volunteer work
              </div>
              <input
                type="number"
                value={extracurricular}
                onChange={(e) => setExtracurricular(e.target.value)}
                min={0}
                max={10}
                placeholder="7"
                required
                style={{ marginTop: "0.5rem" }}
              />
            </label>
          </div>

          {/* Financial & Interview */}
          <div className="card">
            <h3 style={{ marginBottom: "1rem", color: "#4fd1c5" }}>
              💰 Financial & Interview
            </h3>
            
            <label style={{ display: "block", marginBottom: "1rem" }}>
              Income Bracket (1-5) *
              <div style={{ fontSize: "0.85rem", color: "#a0aec0", marginTop: "0.25rem" }}>
                1: 20pts | 2: 15pts | 3: 10pts | 4-5: 5pts
              </div>
              <select
                value={incomeBracket}
                onChange={(e) => setIncomeBracket(e.target.value)}
                required
                style={{ marginTop: "0.5rem", width: "100%" }}
              >
                <option value="">Select bracket</option>
                <option value="1">1 - Low income (20 points)</option>
                <option value="2">2 - Lower-middle (15 points)</option>
                <option value="3">3 - Middle (10 points)</option>
                <option value="4">4 - Upper-middle (5 points)</option>
                <option value="5">5 - High income (5 points)</option>
              </select>
            </label>

            <label style={{ display: "block" }}>
              Interview Score (0-10) *
              <div style={{ fontSize: "0.85rem", color: "#a0aec0", marginTop: "0.25rem" }}>
                Communication, motivation, fit
              </div>
              <input
                type="number"
                value={interview}
                onChange={(e) => setInterview(e.target.value)}
                min={0}
                max={10}
                placeholder="8"
                required
                style={{ marginTop: "0.5rem" }}
              />
            </label>
          </div>
        </div>

        {/* Point Breakdown */}
        <div className="card" style={{ marginBottom: "2rem", background: "rgba(79, 209, 197, 0.1)" }}>
          <h3 style={{ marginBottom: "1rem", color: "#4fd1c5" }}>
            📊 Point System Breakdown
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#a0aec0" }}>Age (10-18: 20pts | 19-30: 15pts | 31-50: 10pts)</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Up to 20 points</div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#a0aec0" }}>Exam Score</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>40 points</div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#a0aec0" }}>Income Bracket</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>20 points</div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#a0aec0" }}>Extracurricular</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>10 points</div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#a0aec0" }}>Interview</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>10 points</div>
            </div>
          </div>
          <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(79, 209, 197, 0.2)", borderRadius: "8px", textAlign: "center" }}>
            <strong>Passing Score: 70/100 points</strong>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!fullName || !email || !dob || !regionCode || !incomeBracket || !examScore || !extracurricular || !interview}
          style={{
            width: "100%",
            padding: "1.25rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            opacity: (!fullName || !email || !dob) ? 0.5 : 1
          }}
        >
          🚀 Submit Application
        </button>
      </form>

      {status && (
        <div className={`status-message ${status.includes("✅") ? "success" : ""}`} style={{ marginTop: "1.5rem" }}>
          {status}
        </div>
      )}

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <a href="/" style={{ color: "#4fd1c5", marginRight: "2rem" }}>← Back to Home</a>
        <a href="/check-enhanced" style={{ color: "#4fd1c5" }}>Check Status →</a>
      </div>

      <Footer />
    </main>
  );
}
