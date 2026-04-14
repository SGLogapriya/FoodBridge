const express = require("express");
const router = express.Router();

const {
  createDonation,
  getDonations,
  acceptDonation
} = require("../controllers/donationController");

// POST
router.post("/", createDonation);

// GET
router.get("/", getDonations);

// PUT
router.put("/:id/accept", acceptDonation);

module.exports = router;