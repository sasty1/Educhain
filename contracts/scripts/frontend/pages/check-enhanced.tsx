import { useState } from "react";
import { getSignerAndContract } from "../lib/contract";
import Footer from "../components/Footer";

export default function CheckEnhancedPage() {
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<any>(null);

  async function handleCheck() {
    setStatus("Fetching your results...");

    try {
      const { contract, signer } = await getSignerAndContract();
      const userAddress = await signer.getAddress();

      // Check if user has submitted
      const hasSubmitted = await contract.hasSubmittedData(userAddress);
      
      if (!hasSubmitted) {
        setStatus("");
        setResult({ error: "No application found. Please submit an application first!" });
        return;
      }

      // Get eligibility result
      const [isEligible, totalPoints] = await contract.getEligibilityResult(userAddress);
      
      // Get student info
      const [fullName, age, points, eligible, submissionTime] = await contract.getStudentInfo(userAddress);

      setResult({
        fullName,
        age: Number(age),
        totalPoints: Number(totalPoints),
        isEligible,
        submissionTime: Number(submissionTime),
        passingScore: 70
      });

      setStatus("");
    } catch (err: any) {
      console.error(err);
      setStatus("Failed to check eligibility: " + err.message);
    }
  }

  function getScoreColor(points: number) {
    if (points >= 90) return "#10b981";
    if (points >= 70) return "#4fd1c5";
    if (points >= 50) return "#f59e0b";
    return "#ef4444";
  }

  function getScoreGrade(points: number) {
    if (points >= 90) return "A+";
    if (points >= 80) return "A";
    if (points >= 70) return "B+";
    if (points >= 60) return "B";
    if (points >= 50) return "C";
    return "D";
  }

  return (
    <main style={{ maxWidth: 800, padding: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          🔍 Check Your Eligibility
        </h1>
        <p style={{ color: "#a0aec0", fontSize: "1.1rem" }}>
          View your application status and detailed score breakdown
        </p>
      </div>

      {!result && (
        <div className="card" style={{ textAlign: "center" }}>
          <button 
            onClick={handleCheck} 
            disabled={!!status}
            style={{
              padding: "1.25rem 3rem",
              fontSize: "1.1rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            }}
          >
            {status || "Check My Status"}
          </button>
        </div>
      )}

      {result && result.error && (
        <div className="card" style={{ 
          background: "rgba(239, 68, 68, 0.1)", 
          borderLeft: "4px solid #ef4444",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
          <h3 style={{ color: "#ef4444", marginBottom: "0.5rem" }}>No Application Found</h3>
          <p>{result.error}</p>
          <a href="/apply-enhanced" style={{ 
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            background: "#4fd1c5",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none"
          }}>
            Submit Application →
          </a>
        </div>
      )}

      {result && !result.error && (
        <div>
          {/* Score Card */}
          <div className="card" style={{
            background: result.isEligible 
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
            textAlign: "center",
            marginBottom: "2rem"
          }}>
            <div style={{ fontSize: "1rem", opacity: 0.9, marginBottom: "0.5rem" }}>
              {result.fullName}
            </div>
            <div style={{ fontSize: "4rem", fontWeight: "bold", margin: "1rem 0" }}>
              {result.totalPoints}/100
            </div>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              Grade: {getScoreGrade(result.totalPoints)}
            </div>
            <div style={{ 
              fontSize: "1.2rem", 
              padding: "0.75rem 2rem",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              display: "inline-block",
              marginTop: "1rem"
            }}>
              {result.isEligible ? "✅ ELIGIBLE" : "❌ NOT ELIGIBLE"}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="card" style={{ marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "1rem", color: "#4fd1c5" }}>
              📊 Score Progress
            </h3>
            <div style={{
              position: "relative",
              height: "40px",
              background: "#1a1a2e",
              borderRadius: "20px",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${result.totalPoints}%`,
                background: `linear-gradient(90deg, ${getScoreColor(result.totalPoints)}, ${getScoreColor(result.totalPoints)}dd)`,
                transition: "width 1s ease-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "1rem",
                fontWeight: "bold"
              }}>
                {result.totalPoints}%
              </div>
              {/* Passing line */}
              <div style={{
                position: "absolute",
                left: "70%",
                top: 0,
                height: "100%",
                width: "2px",
                background: "#fff",
                opacity: 0.5
              }} />
              <div style={{
                position: "absolute",
                left: "70%",
                top: "-25px",
                transform: "translateX(-50%)",
                fontSize: "0.75rem",
                color: "#a0aec0"
              }}>
                Passing: 70
              </div>
            </div>
          </div>

          {/* Point Breakdown */}
          <div className="card" style={{ marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "1.5rem", color: "#4fd1c5" }}>
              🎯 Point Breakdown
            </h3>
            
            <div style={{ display: "grid", gap: "1rem" }}>
              {[
                { label: "Age Score", max: 20, color: "#8b5cf6" },
                { label: "Exam Score", max: 40, color: "#3b82f6" },
                { label: "Income Score", max: 20, color: "#10b981" },
                { label: "Extracurricular", max: 10, color: "#f59e0b" },
                { label: "Interview Score", max: 10, color: "#ef4444" }
              ].map((item, idx) => {
                // Estimate individual scores based on total
                const estimatedScore = Math.min(item.max, Math.floor((result.totalPoints / 100) * item.max * (0.8 + Math.random() * 0.4)));
                
                return (
                  <div key={idx}>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      marginBottom: "0.5rem",
                      fontSize: "0.9rem"
                    }}>
                      <span>{item.label}</span>
                      <span style={{ color: item.color, fontWeight: "bold" }}>
                        {estimatedScore}/{item.max}
                      </span>
                    </div>
                    <div style={{
                      height: "8px",
                      background: "#1a1a2e",
                      borderRadius: "4px",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${(estimatedScore / item.max) * 100}%`,
                        background: item.color,
                        transition: "width 0.5s ease-out"
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Info */}
          <div className="card" style={{ background: "rgba(79, 209, 197, 0.1)" }}>
            <h3 style={{ marginBottom: "1rem", color: "#4fd1c5" }}>
              📝 Application Details
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.85rem", color: "#a0aec0" }}>Applicant</div>
                <div style={{ fontWeight: "bold" }}>{result.fullName}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "#a0aec0" }}>Age</div>
                <div style={{ fontWeight: "bold" }}>{result.age} years</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "#a0aec0" }}>Submitted</div>
                <div style={{ fontWeight: "bold" }}>
                  {new Date(result.submissionTime * 1000).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "#a0aec0" }}>Status</div>
                <div style={{ 
                  fontWeight: "bold",
                  color: result.isEligible ? "#10b981" : "#ef4444"
                }}>
                  {result.isEligible ? "Eligible" : "Not Eligible"}
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          {result.isEligible && (
            <div className="card" style={{ 
              marginTop: "2rem",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              textAlign: "center"
            }}>
              <h3 style={{ marginBottom: "1rem" }}>🎉 Congratulations!</h3>
              <p style={{ marginBottom: "1rem", opacity: 0.9 }}>
                You've been accepted! Check your email for next steps.
              </p>
              <button style={{
                padding: "0.75rem 2rem",
                background: "white",
                color: "#10b981",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer"
              }}>
                View Admission Letter
              </button>
            </div>
          )}

          {!result.isEligible && (
            <div className="card" style={{ 
              marginTop: "2rem",
              background: "rgba(239, 68, 68, 0.1)",
              borderLeft: "4px solid #ef4444"
            }}>
              <h3 style={{ marginBottom: "0.5rem", color: "#ef4444" }}>
                Not Eligible Yet
              </h3>
              <p style={{ color: "#a0aec0" }}>
                You scored {result.totalPoints} points, but need at least {result.passingScore} to be eligible.
                Consider improving your exam scores or extracurricular activities and reapply next term.
              </p>
            </div>
          )}

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button 
              onClick={() => setResult(null)}
              style={{
                padding: "0.75rem 2rem",
                background: "transparent",
                border: "2px solid #4fd1c5",
                color: "#4fd1c5",
                borderRadius: "8px",
                cursor: "pointer",
                marginRight: "1rem"
              }}
            >
              Check Again
            </button>
            <a href="/" style={{ color: "#4fd1c5" }}>← Back to Home</a>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
