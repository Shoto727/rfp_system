const Vendor = require("../models/Vendor");

async function createVendor(req, res) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const vendor = new Vendor({ name, email });
    await vendor.save();

    res.status(201).json(vendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create vendor" });
  }
}

async function getVendors(req, res) {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
}

module.exports = { createVendor, getVendors };
