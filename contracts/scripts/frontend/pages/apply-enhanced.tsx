import { useState, useEffect } from "react";
import { getSignerAndContract } from "../lib/contract";
import Footer from "../components/Footer";

export default function ApplyEnhancedPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [countryCode, setCountryCode] = useState("");
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
        Number(countryCode),
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
    <main style={{ maxWidth: 900, padding: "1.5rem", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", marginBottom: "0.5rem", color: "#10b981" }}>
          School Admission Application
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "clamp(1rem, 3vw, 1.1rem)" }}>
          Complete your application with our privacy-first point-based system
        </p>
      </div>

      {estimatedPoints !== null && (
        <div style={{
          background: estimatedPoints >= 70 ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
          border: `2px solid ${estimatedPoints >= 70 ? "#10b981" : "#ef4444"}`,
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "0.9rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
            Estimated Score
          </div>
          <div style={{ fontSize: "clamp(2.5rem, 8vw, 3rem)", fontWeight: "bold", color: estimatedPoints >= 70 ? "#10b981" : "#ef4444" }}>
            {estimatedPoints}/100
          </div>
          <div style={{ fontSize: "0.9rem", color: estimatedPoints >= 70 ? "#10b981" : "#ef4444", marginTop: "0.5rem" }}>
            {estimatedPoints >= 70 ? "✓ Likely Eligible" : "⚠ Below Passing Score (70)"}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} onChange={handleFormChange}>
        <style>{`
          input, select {
            width: 100%;
            padding: 0.875rem;
            font-size: 16px;
            background: rgba(16, 185, 129, 0.05);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 8px;
            color: #e5e7eb;
            transition: all 0.3s;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
          input:focus, select:focus {
            outline: none;
            border-color: #10b981;
            background: rgba(16, 185, 129, 0.1);
          }
          input::placeholder {
            color: #6b7280;
          }
          input[type="date"] {
            position: relative;
            color-scheme: dark;
          }
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
            opacity: 1;
            width: 20px;
            height: 20px;
            padding: 0;
            margin: 0;
          }
          input[type="date"]::-webkit-datetime-edit {
            color: #e5e7eb;
          }
          input[type="date"]::-webkit-datetime-edit-fields-wrapper {
            padding: 0;
          }
          select {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2310b981' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0.875rem center;
            background-size: 12px;
            padding-right: 2.5rem;
            cursor: pointer;
          }
          select option {
            background: #1f2937;
            color: #e5e7eb;
            padding: 0.5rem;
          }
          label {
            color: #e5e7eb;
            font-weight: 500;
            font-size: 0.95rem;
          }
          .card {
            background: rgba(16, 185, 129, 0.05);
            border: 1px solid rgba(16, 185, 129, 0.2);
            padding: 1.5rem;
            border-radius: 12px;
          }
        `}</style>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          {/* Personal Information Section */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <h3 style={{ marginBottom: "1rem", color: "#10b981", fontSize: "1.25rem" }}>
              Personal Information
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "1rem" }}>
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
                Country *
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  required
                  style={{ marginTop: "0.5rem" }}
                >
                  <option value="">Select country</option>
                  <option value="1">United States</option>
                  <option value="44">United Kingdom</option>
                  <option value="33">France</option>
                  <option value="49">Germany</option>
                  <option value="81">Japan</option>
                  <option value="86">China</option>
                  <option value="91">India</option>
                  <option value="234">Nigeria</option>
                  <option value="27">South Africa</option>
                  <option value="61">Australia</option>
                  <option value="55">Brazil</option>
                  <option value="52">Mexico</option>
                  <option value="82">South Korea</option>
                  <option value="39">Italy</option>
                  <option value="34">Spain</option>
                  <option value="7">Russia</option>
                  <option value="20">Egypt</option>
                  <option value="62">Indonesia</option>
                  <option value="63">Philippines</option>
                  <option value="66">Thailand</option>
                </select>
              </label>
            </div>
          </div>

          {/* Academic Performance */}
          <div className="card">
            <h3 style={{ marginBottom: "1rem", color: "#10b981", fontSize: "1.25rem" }}>
              Academic Performance
            </h3>
            
            <label style={{ display: "block", marginBottom: "1rem" }}>
              Entrance Exam Score (0-100) *
              <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.25rem" }}>
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
              <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.25rem" }}>
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
            <h3 style={{ marginBottom: "1rem", color: "#10b981", fontSize: "1.25rem" }}>
              Financial & Interview
            </h3>
            
            <label style={{ display: "block", marginBottom: "1rem" }}>
              Income Bracket (1-5) *
              <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.25rem" }}>
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
              <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.25rem" }}>
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
        <div className="card" style={{ marginBottom: "2rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
          <h3 style={{ marginBottom: "1rem", color: "#10b981", fontSize: "1.25rem" }}>
            Point System Breakdown
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>Age (10-18: 20pts | 19-30: 15pts | 31-50: 10pts)</div>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#10b981" }}>Up to 20 points</div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>Exam Score</div>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#10b981" }}>40 points</div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>Income Bracket</div>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#10b981" }}>20 points</div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>Extracurricular</div>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#10b981" }}>10 points</div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>Interview</div>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#10b981" }}>10 points</div>
            </div>
          </div>
          <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(16, 185, 129, 0.2)", borderRadius: "8px", textAlign: "center", border: "1px solid #10b981" }}>
            <strong style={{ color: "#10b981" }}>Passing Score: 70/100 points</strong>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!fullName || !email || !dob || !countryCode || !incomeBracket || !examScore || !extracurricular || !interview}
          style={{
            width: "100%",
            padding: "1.25rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            opacity: (!fullName || !email || !dob) ? 0.5 : 1,
            transition: "all 0.3s"
          }}
        >
          Submit Application
        </button>
      </form>

      {status && (
        <div className={`status-message ${status.includes("✅") ? "success" : ""}`} style={{ marginTop: "1.5rem" }}>
          {status}
        </div>
      )}

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <a href="/" style={{ color: "#10b981", marginRight: "2rem", textDecoration: "none", fontWeight: "500" }}>← Back to Home</a>
        <a href="/check-enhanced" style={{ color: "#10b981", textDecoration: "none", fontWeight: "500" }}>Check Status →</a>
      </div>

      <Footer />
    </main>
  );
}
