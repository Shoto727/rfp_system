const RFP = require("../models/RFP");
const { generateRfpUsingAI } = require("../services/openaiService");

/**
 * POST /api/rfp/create-from-text
 * Creates an RFP using AI (with fallback)
 */
const createRfpFromText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    let structuredRfp;

    try {
      // 🔹 Try AI first
      structuredRfp = await generateRfpUsingAI(text);
    } catch (aiError) {
      console.error("⚠️ AI failed, using fallback:", aiError.message);

      // Fallback
      structuredRfp = {
        title: "Generated RFP",
        description: text,
        budget: 0,
        items: [],
        deliveryTimeline: "",
        paymentTerms: "",
        warranty: ""
      };
    }

    const rfp = new RFP(structuredRfp);
    await rfp.save();

    res.status(201).json(rfp);
  } catch (err) {
    console.error("❌ Create RFP Error:", err);
    res.status(500).json({ error: "Failed to create RFP" });
  }
};

/**
 * GET /api/rfp
 * Fetch all RFPs (for dropdown in UI)
 */
const getAllRfps = async (req, res) => {
  try {
    const rfps = await RFP.find().sort({ createdAt: -1 });
    res.json(rfps);
  } catch (err) {
    console.error("❌ Fetch RFPs Error:", err);
    res.status(500).json({ error: "Failed to fetch RFPs" });
  }
};

module.exports = {
  createRfpFromText,
  getAllRfps
};
