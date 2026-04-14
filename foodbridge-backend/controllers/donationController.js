const Donation = require("../models/Donation");

// ✅ CREATE DONATION
exports.createDonation = async (req, res) => {
  try {
    let { location } = req.body;

    // 🔥 FORCE location to STRING
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

// ✅ GET ALL DONATIONS
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();

    const formatted = donations.map(d => ({
      ...d._doc,
      location: typeof d.location === "string"
        ? d.location
        : "Unknown"
    }));

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ msg: "Error fetching donations" });
  }
};

// ✅ ACCEPT DONATION
exports.acceptDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );

    res.json(donation);

  } catch (error) {
    res.status(500).json({ msg: "Error updating donation" });
  }
};