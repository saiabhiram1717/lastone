const mongoose = require("mongoose");

const addonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

const menuItemSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
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

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    // Supports the values already used by the project frontend/seed data.
    diet_type: {
      type: String,
      enum: ["veg", "non-veg", "vegan", "Veg", "Non-Veg", "Vegan"],
      default: "veg",
    },

    image_url: {
      type: String,
      default: "",
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },

    preparationTime: {
      type: Number,
      default: 20,
      min: 0,
    },

    addons: {
      type: [addonSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

menuItemSchema.index({ restaurant: 1, category: 1 });
menuItemSchema.index({ restaurant: 1, isAvailable: 1 });

module.exports =
  mongoose.models.MenuItem ||
  mongoose.model("MenuItem", menuItemSchema);
