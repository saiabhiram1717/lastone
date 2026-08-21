const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },

    phone: {
      type: String,
      trim: true,
      sparse: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["customer", "restaurant", "delivery", "admin"],
      default: "customer",
      index: true,
      required: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    vehicleType: {
      type: String,
      default: "",
      trim: true,
    },

    vehicleNumber: {
      type: String,
      default: "",
      trim: true,
    },

    licenseNumber: {
      type: String,
      default: "",
      trim: true,
    },

    lastLoginAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Same email can exist for different roles, matching the existing login design.
userSchema.index(
  { email: 1, role: 1 },
  { unique: true, sparse: true }
);

userSchema.index({ phone: 1, role: 1 }, { sparse: true });

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
