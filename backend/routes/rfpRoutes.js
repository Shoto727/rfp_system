const express = require("express");
const router = express.Router();
const { createRfpFromText, getAllRfps } = require("../controllers/rfpController");

router.post("/create-from-text", createRfpFromText);
router.get("/", getAllRfps);

module.exports = router;
