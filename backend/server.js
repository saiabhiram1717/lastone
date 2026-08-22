const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config({ path: path.join(__dirname, ".env") });

const FALLBACK_JWT_SECRET = "madfood-fallback-secret-change-for-production";
process.env.JWT_SECRET = process.env.JWT_SECRET || FALLBACK_JWT_SECRET;

const app = express();
const PORT = process.env.PORT || 1717;

// Connect MongoDB
connectDB().catch((err) => {
  console.error("Startup failed:", err.message);
  process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve frontend folder
const FRONTEND_DIR = path.join(__dirname, "../frontend");
app.use(express.static(FRONTEND_DIR));

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/catalog", require("./routes/catalog"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/restaurants", require("./routes/restaurants"));
app.use("/api/delivery", require("./routes/delivery"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/otp", require("./routes/otp"));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "MadFood API",
    database: "connected"
  });
});

// Open newlogin.html by default
app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "newlogin.html"));
});

app.listen(PORT, () => {
  console.log(`MadFood API running on http://localhost:${PORT}`);
});