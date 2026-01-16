const express = require("express");
const router = express.Router();
const { createVendor, getVendors } = require("../controllers/vendorController");

router.post("/", createVendor);
router.get("/", getVendors);

module.exports = router;
