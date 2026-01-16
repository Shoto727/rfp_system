const express = require("express");
const router = express.Router();
const {
  analyzeVendorResponse,
  getProposalsForRfp,
  compareProposals
} = require("../controllers/proposalController");

router.post("/analyze", analyzeVendorResponse);
router.get("/:rfpId", getProposalsForRfp);
router.get("/compare/:rfpId", compareProposals);


module.exports = router;
