import Inventory from "../models/inventoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const getInventory = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const categoryFilter =
      req.query.category && req.query.category !== "all"
        ? { category: req.query.category }
        : {};

    // Filter inventory by the current user
    const inventory = await Inventory.find({
      user: req.user._id,
      ...keyword,
      ...categoryFilter,
    }).sort({ createdAt: -1 });

    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const getInventoryItem = asyncHandler(async (req, res) => {
  try {
    const item = await Inventory.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (item) {
      return res.json(item);
    } else {
      res.status(404);
      throw new Error("Item not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Item not found" });
  }
});

const addInventoryItem = asyncHandler(async (req, res) => {
  try {
    const { name, category, quantity, unit, lowThreshold } = req.body;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case quantity === undefined:
        return res.json({ error: "Quantity is required" });
      case !unit:
        return res.json({ error: "Unit is required" });
      case lowThreshold === undefined:
        return res.json({ error: "Low threshold is required" });
    }

    const item = new Inventory({
      user: req.user._id,
      name,
      category,
      quantity,
      unit,
      lowThreshold,
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const updateInventoryItem = asyncHandler(async (req, res) => {
  try {
    const { name, category, quantity, unit, lowThreshold } = req.body;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case quantity === undefined:
        return res.json({ error: "Quantity is required" });
      case !unit:
        return res.json({ error: "Unit is required" });
      case lowThreshold === undefined:
        return res.json({ error: "Low threshold is required" });
    }

    const item = await Inventory.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (item) {
      item.name = name;
      item.category = category;
      item.quantity = quantity;
      item.unit = unit;
      item.lowThreshold = lowThreshold;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404);
      throw new Error("Item not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const deleteInventoryItem = asyncHandler(async (req, res) => {
  try {
    const item = await Inventory.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (item) {
      res.json({ message: "Item removed" });
    } else {
      res.status(404);
      throw new Error("Item not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const updateQuantity = asyncHandler(async (req, res) => {
  try {
    const { action, amount = 1 } = req.body;

    if (!action || (action !== "increase" && action !== "decrease")) {
      return res
        .status(400)
        .json({ error: "Valid action (increase/decrease) is required" });
    }

    const item = await Inventory.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (item) {
      if (action === "increase") {
        item.quantity += Number(amount);
      } else if (action === "decrease") {
        item.quantity = Math.max(0, item.quantity - Number(amount));
      }

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404);
      throw new Error("Item not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const getLowStockItems = asyncHandler(async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({
      user: req.user._id,
      $expr: { $lte: ["$quantity", "$lowThreshold"] },
    });

    res.json(lowStockItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const getCategoryStats = asyncHandler(async (req, res) => {
  try {
    // Get categories for the current user only
    const categories = await Inventory.distinct("category", {
      user: req.user._id,
    });
    const stats = [];

    for (const category of categories) {
      const count = await Inventory.countDocuments({
        category,
        user: req.user._id,
      });
      stats.push({ category, count });
    }

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  getInventory,
  getInventoryItem,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateQuantity,
  getLowStockItems,
  getCategoryStats,
};
