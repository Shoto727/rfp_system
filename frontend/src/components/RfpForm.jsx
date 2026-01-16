import { useState } from "react";
import axios from "axios";

function RfpForm() {
  const [text, setText] = useState("");
  const [rfp, setRfp] = useState(null);

  const generateRfp = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/rfp/create-from-text",
      { text }
    );
    setRfp(res.data);
  };

  return (
    <div>
      <h2>✨ Create RFP</h2>

      <textarea
        rows="6"
        style={{ width: "100%", resize: "vertical" }}
        placeholder="Describe your procurement needs..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <button onClick={generateRfp}>Generate RFP</button>

      {rfp && (
        <div>
          <h3>Generated RFP</h3>
          <pre>{JSON.stringify(rfp, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default RfpForm;
