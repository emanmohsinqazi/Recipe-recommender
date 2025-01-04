const mongoose = require("mongoose");

const CATEGORIES = {
  DAIRY: "dairy",
  SPICES: "spices",
  FRUITS: "fruits",
  VEGETABLES: "vegetables",
  PANTRY: "pantry",
};

const UNITS = {
  PIECES: "pcs",
  KILOGRAMS: "kg",
  GRAMS: "g",
  LITERS: "l",
  MILLILITERS: "ml",
};

const itemSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",//reference to user collections
        required: true,
      },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(CATEGORIES), // Ensures only valid categories can be used
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, 
    },
    unit: {
      type: String,
      required: true,
      enum: Object.values(UNITS), // Ensures only valid units can be used
    },
    lowStockThreshold: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);
itemSchema.index({ user: 1 });
const KitchenItem = mongoose.model("KitchenItem", itemSchema);

module.exports = {
    KitchenItem,
};
