import { useEffect, useState } from "react";
import axios from "axios";

function VendorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vendors, setVendors] = useState([]);

  const loadVendors = async () => {
    const res = await axios.get("http://localhost:3000/api/vendors");
    setVendors(res.data);
  };

  const addVendor = async () => {
    await axios.post("http://localhost:3000/api/vendors", { name, email });
    setName("");
    setEmail("");
    loadVendors();
  };

  useEffect(() => {
    loadVendors();
  }, []);

  return (
    <div>
      <h2>👥 Manage Vendors</h2>

      <input
        placeholder="Vendor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="vendor@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addVendor}>Add Vendor</button>

      <br /><br />

      {vendors.length > 0 && (
        <div>
          <h3>Vendors List</h3>
          <ul>
            {vendors.map(v => (
              <li key={v._id} style={{ padding: "10px", background: "#f9f9f9", border: "1px solid #ddd", borderRadius: "3px", marginBottom: "8px" }}>
                <strong>{v.name}</strong> ({v.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default VendorForm;
