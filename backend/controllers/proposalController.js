const Proposal = require("../models/Proposal");
const { parseVendorProposal, compareProposalsWithAI } = require("../services/openaiService");

const analyzeVendorResponse = async (req, res) => {
  try {
    const { rfpId, vendorId, responseText } = req.body;

    if (!rfpId || !vendorId || !responseText) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const aiResult = await parseVendorProposal(responseText);

    const proposal = new Proposal({
      rfpId,
      vendorId,
      notes: responseText,
      price: aiResult.price,
      deliveryTimeline: aiResult.deliveryTimeline,
      paymentTerms: aiResult.paymentTerms,
      warranty: aiResult.warranty,
      aiSummary: aiResult.aiSummary
    });

    await proposal.save();

    res.status(201).json(proposal);
  } catch (err) {
    console.error("Failed to analyze proposal:", err);
    res.status(500).json({ error: "Failed to analyze vendor proposal" });
  }
};

const getProposalsForRfp = async (req, res) => {
  try {
    const proposals = await Proposal.find({
      rfpId: req.params.rfpId
    }).populate("vendorId");

    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch proposals" });
  }
};

const compareProposals = async (req, res) => {
  try {
    const { rfpId } = req.params;

    const proposals = await Proposal.find({ rfpId })
      .populate("vendorId");

    if (!proposals.length) {
      return res.status(404).json({ error: "No proposals found for this RFP" });
    }

    const recommendation = await compareProposalsWithAI(proposals);

    res.json({
      proposals,
      recommendation
    });
  } catch (err) {
    console.error("Proposal comparison failed:", err);
    res.status(500).json({ error: "Failed to compare proposals" });
  }
};

module.exports = {
  analyzeVendorResponse,
  getProposalsForRfp,
  compareProposals
};
