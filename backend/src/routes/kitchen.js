const express = require("express");
const kitchenRouter = express.Router();
const { KitchenItem } = require("../models/kitchenItem.js");
const { userAuth } = require("../middlewares/userAuth.js"); 

// GET all kitchen items for a user
kitchenRouter.get("/kitchen/items", userAuth, async (req, res) => {
  try {
    const items = await KitchenItem.find({ user: req.user._id });
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching kitchen items", details: error.message });
  }
});

// GET a specific kitchen item
kitchenRouter.get("/kitchen/items/:id", userAuth, async (req, res) => {
  try {
    const item = await KitchenItem.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching kitchen item", details: error.message });
  }
});

// POST new kitchen item
kitchenRouter.post("/kitchen/items", userAuth, async (req, res) => {
  try {
    const newItem = new KitchenItem({
      ...req.body,
      user: req.user._id,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error creating kitchen item", details: error.message });
  }
});

// PATCH update kitchen item
kitchenRouter.patch("/kitchen/items/:id", userAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "category",
    "quantity",
    "unit",
    "lowStockThreshold",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates" });
  }

  try {
    const item = await KitchenItem.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    updates.forEach((update) => (item[update] = req.body[update]));
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating kitchen item", details: error.message });
  }
});

// Increment quantity by 1
kitchenRouter.patch(
  "/kitchen/items/:id/increment",
  userAuth,
  async (req, res) => {
    try {
      const item = await KitchenItem.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      item.quantity += 1;
      await item.save();

      res.status(200).json({
        item,
        isLowStock: item.quantity <= item.lowStockThreshold,
      });
    } catch (error) {
      res.status(400).json({ error: "Error incrementing quantity" });
    }
  }
);

// Decrement quantity by 1
kitchenRouter.patch(
  "/kitchen/items/:id/decrement",
  userAuth,
  async (req, res) => {
    try {
      const item = await KitchenItem.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      if (item.quantity <= 0) {
        return res.status(400).json({ error: "Quantity cannot be negative" });
      }

      item.quantity -= 1;
      await item.save();

      res.status(200).json({
        item,
        isLowStock: item.quantity <= item.lowStockThreshold,
      });
    } catch (error) {
      res.status(400).json({ error: "Error decrementing quantity" });
    }
  }
);

// DELETE kitchen item
kitchenRouter.delete("/kitchen/items/:id", userAuth, async (req, res) => {
  try {
    const item = await KitchenItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully", item });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting kitchen item", details: error.message });
  }
});

module.exports = {
  kitchenRouter,
};
