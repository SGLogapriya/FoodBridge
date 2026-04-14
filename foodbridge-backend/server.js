const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// =======================
// 🔥 MIDDLEWARES
// =======================
app.use(cors());
app.use(express.json());

// =======================
// 🔥 ROUTES
// =======================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));

// =======================
// 🔥 TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// =======================
// 🔥 GLOBAL ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({ msg: "Something went wrong" });
});

// =======================
// 🔥 START SERVER SAFELY
// =======================
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ DB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);

    // IMPORTANT: still start server so Azure doesn't show crash
    app.listen(PORT, () => {
      console.log(`⚠️ Server running WITHOUT DB on port ${PORT}`);
    });
  }
};

startServer();