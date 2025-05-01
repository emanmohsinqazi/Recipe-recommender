import express from "express";
const router = express.Router();
import { authenticate } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
  getInventory,
  getInventoryItem,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateQuantity,
  getLowStockItems,
  getCategoryStats
} from "../controllers/inventoryController.js";

// Note: Special routes that don't follow the /:id pattern should come before the /:id routes
router.route("/low-stock").get(authenticate, getLowStockItems);
router.route("/category-stats").get(authenticate, getCategoryStats);

router
  .route("/")
  .get(authenticate, getInventory)
  .post(authenticate, addInventoryItem);

router
  .route("/:id")
  .get(authenticate, checkId, getInventoryItem)
  .put(authenticate, checkId, updateInventoryItem)
  .delete(authenticate, checkId, deleteInventoryItem);

router
  .route("/:id/quantity")
  .patch(authenticate, checkId, updateQuantity);

export default router;