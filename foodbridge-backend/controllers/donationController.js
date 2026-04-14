const Donation = require("../models/Donation");

// ==============================
// ✅ CREATE DONATION (UNCHANGED)
// ==============================
exports.createDonation = async (req, res) => {
  try {
    let { location } = req.body;

    // 🔥 FORCE location to STRING (your existing logic)
    if (typeof location === "object") {
      if (Array.isArray(location)) {
        location = location.join(", ");
      } else {
        location = `${location.city || ""}, ${location.state || ""}`;
      }
    }

    const donation = await Donation.create({
      ...req.body,
      location
    });

    res.status(201).json({
      msg: "Donation created",
      donation
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ==============================
// ✅ GET DONATIONS (FIXED + ENHANCED)
// ==============================
exports.getDonations = async (req, res) => {
  try {
    const { email, status } = req.query;

    let filter = {};

    // 👤 Donor-specific filter
    if (email) {
      filter.email = email;
    }

    // 🏢 NGO filter
    if (status) {
      filter.status = status;
    }

    const donations = await Donation.find(filter);

    const formatted = donations.map(d => ({
      ...d._doc,
      location:
        typeof d.location === "string"
          ? d.location
          : "Unknown"
    }));

    res.json(formatted);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error fetching donations" });
  }
};

// ==============================
// ✅ ACCEPT DONATION (UNCHANGED)
// ==============================
exports.acceptDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );

    res.json(donation);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error updating donation" });
  }
};