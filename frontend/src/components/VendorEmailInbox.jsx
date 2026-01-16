import { useEffect, useState } from "react";
import axios from "axios";

function VendorEmailInbox() {
  const [rfps, setRfps] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [rfpId, setRfpId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/rfp").then(res => setRfps(res.data));
    axios.get("http://localhost:3000/api/vendors").then(res => setVendors(res.data));
  }, []);

  const analyzeEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/proposals/analyze",
        {
          rfpId,
          vendorId,
          responseText: emailText
        }
      );
      setResult(res.data);
    } catch (err) {
      alert("Failed to analyze vendor email");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>📧 Analyze Vendor Response</h2>

      <select onChange={e => setRfpId(e.target.value)}>
        <option value="">Select RFP</option>
        {rfps.map(r => (
          <option key={r._id} value={r._id}>{r.title}</option>
        ))}
      </select>

      <select onChange={e => setVendorId(e.target.value)}>
        <option value="">Select Vendor</option>
        {vendors.map(v => (
          <option key={v._id} value={v._id}>{v.name}</option>
        ))}
      </select>

      <br /><br />

      <textarea
        rows="6"
        placeholder="Paste vendor email response here..."
        value={emailText}
        onChange={e => setEmailText(e.target.value)}
        style={{ width: "100%", resize: "vertical" }}
      />

      <br />

      <button onClick={analyzeEmail} disabled={loading || !rfpId || !vendorId}>
        {loading ? "🔍 Analyzing..." : "Analyze Email"}
      </button>

      {result && (
        <div>
          <h3>📊 Parsed Proposal</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default VendorEmailInbox;
