const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  specs: String
});

const RFPSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,

  items: [ItemSchema],

  deliveryTimeline: String,
  paymentTerms: String,
  warranty: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("RFP", RFPSchema);