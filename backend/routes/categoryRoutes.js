import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizedAdmin, createCategory);
router
  .route("/:categoryId")
  .put(authenticate, authorizedAdmin, updateCategory)
  .delete(authenticate, authorizedAdmin, removeCategory);

router.route("/categories").get(authenticate,  listCategory);
router.route("/:id").get(authenticate, authorizedAdmin, readCategory);

export default router;
