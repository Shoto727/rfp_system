import { useEffect, useState } from "react";
import axios from "axios";

function ProposalComparison() {
  const [rfps, setRfps] = useState([]);
  const [rfpId, setRfpId] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/rfp")
      .then(res => setRfps(res.data));
  }, []);

  const fetchComparison = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/proposals/compare/${rfpId}`
    );
    setData(res.data);
  };

  return (
    <div>
      <h2>📊 Compare Proposals</h2>

      <select onChange={e => setRfpId(e.target.value)}>
        <option value="">Select RFP</option>
        {rfps.map(r => (
          <option key={r._id} value={r._id}>
            {r.title}
          </option>
        ))}
      </select>

      <button onClick={fetchComparison} disabled={!rfpId}>
        Compare Proposals
      </button>

      {data && (
        <>
          <table>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Price</th>
                <th>Delivery</th>
                <th>Payment Terms</th>
                <th>Warranty</th>
              </tr>
            </thead>
            <tbody>
              {data.proposals.map(p => (
                <tr key={p._id}>
                  <td><strong>{p.vendorId.name}</strong></td>
                  <td>{p.price || "N/A"}</td>
                  <td>{p.deliveryTimeline || "N/A"}</td>
                  <td>{p.paymentTerms || "N/A"}</td>
                  <td>{p.warranty || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px", padding: "15px", background: "#f0f4f8", borderLeft: "3px solid #4a90e2" }}>
            <h3>🤖 AI Recommendation</h3>
            <p style={{ margin: "5px 0 0 0", color: "#555", lineHeight: "1.5" }}>{data.recommendation}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ProposalComparison;
