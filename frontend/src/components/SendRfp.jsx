import { useEffect, useState } from "react";
import axios from "axios";

function SendRfp() {
  const [rfps, setRfps] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [rfpId, setRfpId] = useState("");
  const [vendorId, setVendorId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/rfp").then(res => setRfps(res.data));
    axios.get("http://localhost:3000/api/vendors").then(res => setVendors(res.data));
  }, []);

  const sendRfp = async () => {
    await axios.post("http://localhost:3000/api/rfp/send", {
      rfpId,
      vendorIds: [vendorId]
    });
    alert("RFP sent successfully!");
  };

  return (
    <div>
      <h2>📬 Send RFP</h2>

      <select onChange={(e) => setRfpId(e.target.value)}>
        <option value="">Select RFP</option>
        {rfps.map(r => (
          <option key={r._id} value={r._id}>{r.title}</option>
        ))}
      </select>

      <select onChange={(e) => setVendorId(e.target.value)}>
        <option value="">Select Vendor</option>
        {vendors.map(v => (
          <option key={v._id} value={v._id}>{v.name}</option>
        ))}
      </select>

      <button onClick={sendRfp} disabled={!rfpId || !vendorId}>Send RFP Email</button>
    </div>
  );
}

export default SendRfp;
