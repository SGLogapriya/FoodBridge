const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// =======================
// 🔥 CORS FIX (AZURE READY)
// =======================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://lemon-forest-048740e00.7.azurestaticapps.net"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman / mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

// =======================
// 🔥 MIDDLEWARES
// =======================
app.use(express.json());

// =======================
// 🔥 ROUTES (UNCHANGED)
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

    // still start server so Azure doesn't crash deployment
    app.listen(PORT, () => {
      console.log(`⚠️ Server running WITHOUT DB on port ${PORT}`);
    });
  }
};

startServer();