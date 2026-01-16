const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

const rfpRoutes = require("./routes/rfpRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const sendRfpRoutes = require("./routes/sendRfpRoutes"); // ✅ MUST EXIST
const proposalRoutes = require("./routes/proposalRoutes");

app.use(express.json());

app.use("/api/rfp", rfpRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/rfp", sendRfpRoutes); // ✅ THIS LINE FIXES 404
app.use("/api/proposals", proposalRoutes);

app.get("/", (req, res) => {
  res.send("RFP System Backend is running");
});

module.exports = app;
