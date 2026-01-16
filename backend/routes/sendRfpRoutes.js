const express = require("express");
const router = express.Router();
const { sendRfpToVendors } = require("../controllers/sendRfpController");

router.post("/send", sendRfpToVendors);

module.exports = router;
