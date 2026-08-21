const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    method: {
      type: String,
      enum: ["COD", "UPI", "CARD", "RAZORPAY"],
      default: "COD",
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
      index: true,
    },

    transactionId: {
      type: String,
      default: "",
      trim: true,
    },

    provider: {
      type: String,
      default: "manual",
      trim: true,
    },

    raw: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

paymentSchema.index({ transactionId: 1 }, { sparse: true });

module.exports =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
