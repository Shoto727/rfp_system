const RFP = require("../models/RFP");
const Vendor = require("../models/Vendor");
const { sendRfpEmail } = require("../services/emailService");

async function sendRfpToVendors(req, res) {
  try {
    const { rfpId, vendorIds } = req.body;

    if (!rfpId || !vendorIds || vendorIds.length === 0) {
      return res.status(400).json({ error: "rfpId and vendorIds are required" });
    }

    const rfp = await RFP.findById(rfpId);
    if (!rfp) {
      return res.status(404).json({ error: "RFP not found" });
    }

    const vendors = await Vendor.find({ _id: { $in: vendorIds } });
    if (vendors.length === 0) {
      return res.status(404).json({ error: "No vendors found" });
    }

    for (const vendor of vendors) {
      await sendRfpEmail(vendor.email, rfp);
    }

    res.json({ message: "RFP sent successfully" });
  } catch (err) {
    console.error("❌ Send RFP Error:", err);
    res.status(500).json({ error: "Failed to send RFP emails" });
  }
}

module.exports = { sendRfpToVendors };
