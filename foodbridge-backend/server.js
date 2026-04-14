const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// 🔥 CONNECT DATABASE
connectDB();

// 🔥 MIDDLEWARES
app.use(cors());
app.use(express.json());

// 🔥 ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));

// ✅ TEST ROUTE (VERY USEFUL)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ❌ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);
  res.status(500).json({
    msg: "Something went wrong",
  });
});

// 🔥 PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);