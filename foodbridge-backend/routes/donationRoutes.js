const express = require("express");
const router = express.Router();

const {
  createDonation,
  getDonations,
  acceptDonation
} = require("../controllers/donationController");

// CREATE donation
router.post("/", createDonation);

// GET all donations
router.get("/", getDonations);

// ACCEPT donation
router.put("/:id/accept", acceptDonation);

module.exports = router;