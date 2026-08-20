const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing in .env");
  mongoose.connection.on("connected", () => console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`));
  mongoose.connection.on("error", (err) => console.error("MongoDB error:", err.message));
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
}
module.exports = connectDB;
