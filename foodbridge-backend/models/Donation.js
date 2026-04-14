const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorType: {
    type: String,
    enum: ["individual", "organization"],
    required: true
  },

  // 👤 INDIVIDUAL
  donorName: String,
  phone: String,
  email: String,

  // 🏢 ORGANIZATION
  organization: {
    name: String,
    phone: String,
    email: String,
    representative: {
      name: String,
      phone: String,
      email: String
    }
  },

  foodName: {
    type: String,
    required: true
  },

  quantity: Number,
  expiryTime: Number,

  address: {
    line1: String,
    line2: String,
    district: String,
    state: String,
    country: String,
    pincode: String
  },

  // 🔥 GEO LOCATION
  location: {
    lat: Number,
    lng: Number
  },

  description: String,

  status: {
    type: String,
    default: "available"
  }

}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);