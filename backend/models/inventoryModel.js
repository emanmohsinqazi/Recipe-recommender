import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["ingredients", "fruits", "vegetables", "dairy"],
      default: "ingredients",
    },
    quantity: { type: Number, required: true, default: 0 },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "L", "pcs", "g"],
      default: "kg",
    },
    lowThreshold: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
