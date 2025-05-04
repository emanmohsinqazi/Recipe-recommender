import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  checkFavorite
} from '../controllers/favoriteRecipeController.js';

const router = express.Router();

// All routes are protected with authentication
router.use(authenticate);

router.route('/')
  .get(getFavorites)
  .post(addFavorite);

router.route('/toggle')
  .post(toggleFavorite);

router.route('/check/:recipe_name')
  .get(checkFavorite);

router.route('/:recipe_name')
  .delete(removeFavorite);

export default router;

