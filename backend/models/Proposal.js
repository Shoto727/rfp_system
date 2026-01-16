const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  rfpId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RFP"
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor"
  },

  price: Number,
  deliveryTimeline: String,
  paymentTerms: String,
  warranty: String,

  notes: String,        // extracted from email
  aiSummary: String,    // AI-generated summary

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Proposal", ProposalSchema);
