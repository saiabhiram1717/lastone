const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    cuisine: {
      type: String,
      default: "Indian",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    contact_number: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    fssai_license: {
      type: String,
      default: "",
      trim: true,
    },

    image_url: {
      type: String,
      default: "",
      trim: true,
    },

    openingTime: {
      type: String,
      default: "10:00 AM",
    },

    closingTime: {
      type: String,
      default: "11:00 PM",
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Suspended"],
      default: "Pending",
      index: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    ratingsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

restaurantSchema.index({ owner: 1 });

module.exports =
  mongoose.models.Restaurant ||
  mongoose.model("Restaurant", restaurantSchema);
