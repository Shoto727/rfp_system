import RfpForm from "./components/RfpForm";
import VendorForm from "./components/VendorForm";
import SendRfp from "./components/SendRfp";
import VendorEmailInbox from "./components/VendorEmailInbox";
import ProposalComparison from "./components/ProposalComparison";



function App() {
  return (
    <div>
      <div style={{ marginBottom: "30px", paddingBottom: "15px", borderBottom: "1px solid #ddd" }}>
        <h1 style={{ margin: "0", color: "#333", fontSize: "2.2em", fontWeight: "700" }}>🤖 AI-Powered RFP System</h1>
        <p style={{ margin: "5px 0 0 0", color: "#666", fontSize: "0.95em" }}>Streamline your RFP process with AI</p>
      </div>

      <div className="section">
        <RfpForm />
      </div>

      <div className="section">
        <VendorForm />
      </div>

      <div className="section">
        <SendRfp />
      </div>

      <div className="section">
        <VendorEmailInbox />
      </div>

      <div className="section">
        <ProposalComparison />
      </div>
    </div>
  );
}

export default App;
