import Footer from "../components/Footer";
import { GraduationCap } from "lucide-react";

export default function DocsPage() {
  return (
    <main style={{ maxWidth: 900, padding: "2rem", lineHeight: "1.8", color: "#e5e7eb" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <GraduationCap style={{ width: "48px", height: "48px", color: "#10b981", margin: "0 auto 1rem" }} />
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#10b981" }}>
          How School Eligibility Works
        </h1>
      </div>
      
      <div className="card" style={{ marginBottom: "2rem", background: "rgba(16, 185, 129, 0.1)", borderLeft: "4px solid #10b981", padding: "1.5rem", borderRadius: "8px" }}>
        <h2 style={{ color: "#10b981", marginBottom: "1rem" }}>The Problem We're Solving</h2>
        <p>
          Imagine you're a student applying to a private school. You need to share sensitive information like your family's income level, exam scores, age, and extracurricular activities.
        </p>
        <p style={{ marginTop: "1rem" }}>
          <strong>The dilemma</strong>: You want to know if you're eligible, but you don't want to expose all this private information to everyone on the blockchain. Traditional blockchain systems are transparent - anyone can see your data!
        </p>
      </div>

      <div className="card" style={{ marginBottom: "2rem", background: "rgba(16, 185, 129, 0.05)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
        <h2 style={{ color: "#10b981", marginBottom: "1rem" }}>How FHE Protects Your Privacy</h2>
        
        <h3 style={{ color: "#34d399", marginTop: "1.5rem", marginBottom: "0.75rem" }}>What is FHE? (In Simple Terms)</h3>
        <p>Think of FHE as a <strong>magic lockbox</strong>:</p>
        <ol style={{ paddingLeft: "1.5rem", marginTop: "1rem" }}>
          <li style={{ marginBottom: "0.5rem" }}><strong>You lock your secrets inside</strong> - Your sensitive data gets encrypted in your browser</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>The lockbox does calculations</strong> - The smart contract can perform math on encrypted data</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>The lockbox never opens</strong> - Your data stays encrypted the entire time</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>Only you have the key</strong> - Only you can decrypt the final result</li>
        </ol>

        <div style={{ 
          marginTop: "1.5rem", 
          padding: "1rem", 
          background: "rgba(16, 185, 129, 0.15)", 
          borderRadius: "8px",
          borderLeft: "3px solid #10b981"
        }}>
          <strong>Real-World Analogy:</strong>
          <p style={{ marginTop: "0.5rem", marginBottom: 0 }}>
            <strong>Traditional System:</strong> You hand over your wallet, the teller counts your money in front of everyone<br/>
            <strong>With FHE:</strong> You put your wallet in a special box, the box tells the teller "yes, they have enough" without opening
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "2rem", background: "rgba(16, 185, 129, 0.05)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
        <h2 style={{ color: "#10b981", marginBottom: "1rem" }}>The Point-Based System</h2>
        
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <h3 style={{ color: "#10b981" }}>1. Age Score (20 points max)</h3>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
              <li><strong>Ages 10-18:</strong> 20 points - Traditional students</li>
              <li><strong>Ages 19-30:</strong> 15 points - Young adults, second chances</li>
              <li><strong>Ages 31-50:</strong> 10 points - Career change, never too late!</li>
              <li><strong>Ages 5-9:</strong> 15 points - Advanced young learners</li>
              <li><strong>Ages 51-65:</strong> 10 points - Lifelong learning</li>
            </ul>
            <p style={{ marginTop: "0.75rem", color: "#9ca3af", fontSize: "0.95rem" }}>
              <em>We believe education should be accessible to everyone, regardless of age.</em>
            </p>
          </div>

          <div>
            <h3 style={{ color: "#10b981" }}>2. Exam Score (40 points max)</h3>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
              <li><strong>90-100:</strong> 40 points - Outstanding!</li>
              <li><strong>80-89:</strong> 30 points - Great work!</li>
              <li><strong>70-79:</strong> 20 points - Good effort!</li>
              <li><strong>60-69:</strong> 10 points - Meets minimum</li>
            </ul>
            <p style={{ marginTop: "0.75rem", color: "#9ca3af", fontSize: "0.95rem" }}>
              <em>Academic ability is important, but it's only 40% of your score.</em>
            </p>
          </div>

          <div>
            <h3 style={{ color: "#10b981" }}>3. Income Bracket (20 points max)</h3>
            <p style={{ marginBottom: "0.75rem" }}>Lower income gets MORE points (equity-based):</p>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li><strong>Bracket 1 (Low):</strong> 20 points</li>
              <li><strong>Bracket 2 (Lower-middle):</strong> 15 points</li>
              <li><strong>Bracket 3 (Middle):</strong> 10 points</li>
              <li><strong>Bracket 4-5 (Upper):</strong> 5 points</li>
            </ul>
            <p style={{ marginTop: "0.75rem", color: "#9ca3af", fontSize: "0.95rem" }}>
              <em>Talent exists everywhere, but opportunity doesn't. With FHE, we verify income without revealing details!</em>
            </p>
          </div>

          <div>
            <h3 style={{ color: "#10b981" }}>4. Extracurricular (10 points max)</h3>
            <p>Sports, arts, volunteering, clubs, leadership - Score yourself 0-10</p>
            <p style={{ marginTop: "0.75rem", color: "#9ca3af", fontSize: "0.95rem" }}>
              <em>School isn't just about grades. We want well-rounded students!</em>
            </p>
          </div>

          <div>
            <h3 style={{ color: "#10b981" }}>5. Interview Score (10 points max)</h3>
            <p>Communication, motivation, cultural fit, personal story - Score 0-10</p>
            <p style={{ marginTop: "0.75rem", color: "#9ca3af", fontSize: "0.95rem" }}>
              <em>We want to know YOU - your dreams, your story, what drives you.</em>
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "2rem", background: "rgba(16, 185, 129, 0.2)", color: "white", padding: "1.5rem", borderRadius: "8px", border: "2px solid #10b981" }}>
        <h2 style={{ marginBottom: "1rem", color: "#10b981" }}>The Passing Score: 70/100</h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#e5e7eb" }}>
          To be eligible for admission, you need <strong>at least 70 points</strong>.
        </p>
        <p style={{ color: "#d1d5db" }}>
          This balanced threshold rewards strong academic performance, considers financial circumstances, values well-rounded students, and gives multiple paths to success.
        </p>
      </div>

      <div className="card" style={{ marginBottom: "2rem", background: "rgba(16, 185, 129, 0.05)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
        <h2 style={{ color: "#10b981", marginBottom: "1rem" }}>Example Success Stories</h2>
        
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div style={{ padding: "1rem", background: "rgba(16, 185, 129, 0.1)", borderRadius: "8px", borderLeft: "3px solid #10b981" }}>
            <h4 style={{ color: "#10b981", marginBottom: "0.75rem" }}>Meet Sarah (Age 15)</h4>
            <ul style={{ paddingLeft: "1.5rem", fontSize: "0.95rem" }}>
              <li>Age: 20 points (perfect range)</li>
              <li>Exam: 85 → 30 points</li>
              <li>Income: Bracket 2 → 15 points</li>
              <li>Extracurricular: 8 points (soccer, volunteering)</li>
              <li>Interview: 9 points (passionate about science)</li>
            </ul>
            <p style={{ marginTop: "0.75rem", fontSize: "1.1rem", fontWeight: "bold", color: "#10b981" }}>
              Total: 82 points - ELIGIBLE!
            </p>
          </div>

          <div style={{ padding: "1rem", background: "rgba(16, 185, 129, 0.1)", borderRadius: "8px", borderLeft: "3px solid #10b981" }}>
            <h4 style={{ color: "#10b981", marginBottom: "0.75rem" }}>Meet James (Age 28)</h4>
            <ul style={{ paddingLeft: "1.5rem", fontSize: "0.95rem" }}>
              <li>Age: 15 points (young adult, career change)</li>
              <li>Exam: 92 → 40 points</li>
              <li>Income: Bracket 4 → 5 points</li>
              <li>Extracurricular: 7 points (community organizer)</li>
              <li>Interview: 10 points (inspiring story)</li>
            </ul>
            <p style={{ marginTop: "0.75rem", fontSize: "1.1rem", fontWeight: "bold", color: "#10b981" }}>
              Total: 77 points - ELIGIBLE!
            </p>
          </div>

          <div style={{ padding: "1rem", background: "rgba(16, 185, 129, 0.1)", borderRadius: "8px", borderLeft: "3px solid #10b981" }}>
            <h4 style={{ color: "#10b981", marginBottom: "0.75rem" }}>Meet Maria (Age 42)</h4>
            <ul style={{ paddingLeft: "1.5rem", fontSize: "0.95rem" }}>
              <li>Age: 10 points (adult learner)</li>
              <li>Exam: 88 → 30 points</li>
              <li>Income: Bracket 1 → 20 points</li>
              <li>Extracurricular: 9 points (active volunteer)</li>
              <li>Interview: 8 points (determined to succeed)</li>
            </ul>
            <p style={{ marginTop: "0.75rem", fontSize: "1.1rem", fontWeight: "bold", color: "#10b981" }}>
              Total: 77 points - ELIGIBLE!
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "2rem", background: "rgba(16, 185, 129, 0.1)", borderLeft: "4px solid #10b981", padding: "1.5rem", borderRadius: "8px" }}>
        <h2 style={{ color: "#10b981", marginBottom: "1rem" }}>Key Takeaways</h2>
        <ol style={{ paddingLeft: "1.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}><strong>Privacy is a right</strong>, not a luxury - FHE makes it possible on blockchain</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>Fairness matters</strong> - Our point system gives everyone a chance</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>Education is for everyone</strong> - Age shouldn't be a barrier</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>Technology serves people</strong> - We use FHE to protect, not expose</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>Transparency + Privacy</strong> - You can have both with the right tools</li>
        </ol>
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <a href="/apply-enhanced" style={{
          display: "inline-block",
          padding: "1rem 2rem",
          background: "#10b981",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          marginRight: "1rem",
          transition: "all 0.3s"
        }}>
          Apply Now →
        </a>
        <a href="/" style={{ color: "#10b981", textDecoration: "none", fontWeight: "500" }}>← Back to Home</a>
      </div>

      <div style={{ marginTop: "3rem", textAlign: "center", color: "#9ca3af", fontSize: "0.9rem" }}>
        <p><strong>Remember</strong>: This system is designed with YOU in mind.</p>
        <p>Your privacy matters. Your story matters. Your future matters.</p>
      </div>

      <Footer />
    </main>
  );
}
