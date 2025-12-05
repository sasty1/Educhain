export default function Home() {
  return (
    <main>
      <h1>🎓 Private School Eligibility System</h1>
      <p style={{ fontSize: "1.2rem", color: "#a0aec0" }}>
        A privacy-preserving admission system with point-based scoring powered by blockchain technology.
      </p>

      <div className="card" style={{ marginTop: "2rem" }}>
        <h3 style={{ marginBottom: "1rem", color: "#4fd1c5" }}>
          ✨ How It Works
        </h3>
        <ol style={{ color: "#e0e0e0", paddingLeft: "1.5rem", lineHeight: "1.8" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            Connect your MetaMask wallet
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Submit your application with personal and academic details
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Smart contract calculates your eligibility score (out of 100 points)
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Check your status and view detailed score breakdown
          </li>
        </ol>
      </div>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem", marginBottom: "2rem" }}>
        <a href="/apply-enhanced" className="cta-button">
          📝 Apply Now (Enhanced)
        </a>
        <a href="/check-enhanced" className="cta-button secondary">
          🔍 Check Status (Enhanced)
        </a>
      </div>

      <div style={{ marginTop: "3rem", fontSize: "0.95rem", color: "#a0aec0", textAlign: "center" }}>
        <p>
          Created by{" "}
          <a 
            href="https://twitter.com/iam_sasty" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "#4fd1c5", 
              textDecoration: "none",
              fontWeight: "bold",
              transition: "color 0.3s"
            }}
          >
            @iam_sasty
          </a>
        </p>
      </div>
    </main>
  );
}
