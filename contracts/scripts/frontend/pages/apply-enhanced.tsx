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
                  <option value="93">Afghanistan</option>
                  <option value="355">Albania</option>
                  <option value="213">Algeria</option>
                  <option value="1">Andorra</option>
                  <option value="244">Angola</option>
                  <option value="1">Antigua and Barbuda</option>
                  <option value="54">Argentina</option>
                  <option value="374">Armenia</option>
                  <option value="61">Australia</option>
                  <option value="43">Austria</option>
                  <option value="994">Azerbaijan</option>
                  <option value="1">Bahamas</option>
                  <option value="973">Bahrain</option>
                  <option value="880">Bangladesh</option>
                  <option value="1">Barbados</option>
                  <option value="375">Belarus</option>
                  <option value="32">Belgium</option>
                  <option value="501">Belize</option>
                  <option value="229">Benin</option>
                  <option value="975">Bhutan</option>
                  <option value="591">Bolivia</option>
                  <option value="387">Bosnia and Herzegovina</option>
                  <option value="267">Botswana</option>
                  <option value="55">Brazil</option>
                  <option value="673">Brunei</option>
                  <option value="359">Bulgaria</option>
                  <option value="226">Burkina Faso</option>
                  <option value="257">Burundi</option>
                  <option value="855">Cambodia</option>
                  <option value="237">Cameroon</option>
                  <option value="1">Canada</option>
                  <option value="238">Cape Verde</option>
                  <option value="236">Central African Republic</option>
                  <option value="235">Chad</option>
                  <option value="56">Chile</option>
                  <option value="86">China</option>
                  <option value="57">Colombia</option>
                  <option value="269">Comoros</option>
                  <option value="242">Congo</option>
                  <option value="506">Costa Rica</option>
                  <option value="385">Croatia</option>
                  <option value="53">Cuba</option>
                  <option value="357">Cyprus</option>
                  <option value="420">Czech Republic</option>
                  <option value="243">Democratic Republic of the Congo</option>
                  <option value="45">Denmark</option>
                  <option value="253">Djibouti</option>
                  <option value="1">Dominica</option>
                  <option value="1">Dominican Republic</option>
                  <option value="670">East Timor</option>
                  <option value="593">Ecuador</option>
                  <option value="20">Egypt</option>
                  <option value="503">El Salvador</option>
                  <option value="240">Equatorial Guinea</option>
                  <option value="291">Eritrea</option>
                  <option value="372">Estonia</option>
                  <option value="268">Eswatini</option>
                  <option value="251">Ethiopia</option>
                  <option value="679">Fiji</option>
                  <option value="358">Finland</option>
                  <option value="33">France</option>
                  <option value="241">Gabon</option>
                  <option value="220">Gambia</option>
                  <option value="995">Georgia</option>
                  <option value="49">Germany</option>
                  <option value="233">Ghana</option>
                  <option value="30">Greece</option>
                  <option value="1">Grenada</option>
                  <option value="502">Guatemala</option>
                  <option value="224">Guinea</option>
                  <option value="245">Guinea-Bissau</option>
                  <option value="592">Guyana</option>
                  <option value="509">Haiti</option>
                  <option value="504">Honduras</option>
                  <option value="36">Hungary</option>
                  <option value="354">Iceland</option>
                  <option value="91">India</option>
                  <option value="62">Indonesia</option>
                  <option value="98">Iran</option>
                  <option value="964">Iraq</option>
                  <option value="353">Ireland</option>
                  <option value="972">Israel</option>
                  <option value="39">Italy</option>
                  <option value="225">Ivory Coast</option>
                  <option value="1">Jamaica</option>
                  <option value="81">Japan</option>
                  <option value="962">Jordan</option>
                  <option value="7">Kazakhstan</option>
                  <option value="254">Kenya</option>
                  <option value="686">Kiribati</option>
                  <option value="383">Kosovo</option>
                  <option value="965">Kuwait</option>
                  <option value="996">Kyrgyzstan</option>
                  <option value="856">Laos</option>
                  <option value="371">Latvia</option>
                  <option value="961">Lebanon</option>
                  <option value="266">Lesotho</option>
                  <option value="231">Liberia</option>
                  <option value="218">Libya</option>
                  <option value="423">Liechtenstein</option>
                  <option value="370">Lithuania</option>
                  <option value="352">Luxembourg</option>
                  <option value="261">Madagascar</option>
                  <option value="265">Malawi</option>
                  <option value="60">Malaysia</option>
                  <option value="960">Maldives</option>
                  <option value="223">Mali</option>
                  <option value="356">Malta</option>
                  <option value="692">Marshall Islands</option>
                  <option value="222">Mauritania</option>
                  <option value="230">Mauritius</option>
                  <option value="52">Mexico</option>
                  <option value="691">Micronesia</option>
                  <option value="373">Moldova</option>
                  <option value="377">Monaco</option>
                  <option value="976">Mongolia</option>
                  <option value="382">Montenegro</option>
                  <option value="212">Morocco</option>
                  <option value="258">Mozambique</option>
                  <option value="95">Myanmar</option>
                  <option value="264">Namibia</option>
                  <option value="674">Nauru</option>
                  <option value="977">Nepal</option>
                  <option value="31">Netherlands</option>
                  <option value="64">New Zealand</option>
                  <option value="505">Nicaragua</option>
                  <option value="227">Niger</option>
                  <option value="234">Nigeria</option>
                  <option value="850">North Korea</option>
                  <option value="389">North Macedonia</option>
                  <option value="47">Norway</option>
                  <option value="968">Oman</option>
                  <option value="92">Pakistan</option>
                  <option value="680">Palau</option>
                  <option value="970">Palestine</option>
                  <option value="507">Panama</option>
                  <option value="675">Papua New Guinea</option>
                  <option value="595">Paraguay</option>
                  <option value="51">Peru</option>
                  <option value="63">Philippines</option>
                  <option value="48">Poland</option>
                  <option value="351">Portugal</option>
                  <option value="974">Qatar</option>
                  <option value="40">Romania</option>
                  <option value="7">Russia</option>
                  <option value="250">Rwanda</option>
                  <option value="1">Saint Kitts and Nevis</option>
                  <option value="1">Saint Lucia</option>
                  <option value="1">Saint Vincent and the Grenadines</option>
                  <option value="685">Samoa</option>
                  <option value="378">San Marino</option>
                  <option value="239">Sao Tome and Principe</option>
                  <option value="966">Saudi Arabia</option>
                  <option value="221">Senegal</option>
                  <option value="381">Serbia</option>
                  <option value="248">Seychelles</option>
                  <option value="232">Sierra Leone</option>
                  <option value="65">Singapore</option>
                  <option value="421">Slovakia</option>
                  <option value="386">Slovenia</option>
                  <option value="677">Solomon Islands</option>
                  <option value="252">Somalia</option>
                  <option value="27">South Africa</option>
                  <option value="82">South Korea</option>
                  <option value="211">South Sudan</option>
                  <option value="34">Spain</option>
                  <option value="94">Sri Lanka</option>
                  <option value="249">Sudan</option>
                  <option value="597">Suriname</option>
                  <option value="46">Sweden</option>
                  <option value="41">Switzerland</option>
                  <option value="963">Syria</option>
                  <option value="886">Taiwan</option>
                  <option value="992">Tajikistan</option>
                  <option value="255">Tanzania</option>
                  <option value="66">Thailand</option>
                  <option value="228">Togo</option>
                  <option value="676">Tonga</option>
                  <option value="1">Trinidad and Tobago</option>
                  <option value="216">Tunisia</option>
                  <option value="90">Turkey</option>
                  <option value="993">Turkmenistan</option>
                  <option value="688">Tuvalu</option>
                  <option value="256">Uganda</option>
                  <option value="380">Ukraine</option>
                  <option value="971">United Arab Emirates</option>
                  <option value="44">United Kingdom</option>
                  <option value="1">United States</option>
                  <option value="598">Uruguay</option>
                  <option value="998">Uzbekistan</option>
                  <option value="678">Vanuatu</option>
                  <option value="379">Vatican City</option>
                  <option value="58">Venezuela</option>
                  <option value="84">Vietnam</option>
                  <option value="967">Yemen</option>
                  <option value="260">Zambia</option>
                  <option value="263">Zimbabwe</option>
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
