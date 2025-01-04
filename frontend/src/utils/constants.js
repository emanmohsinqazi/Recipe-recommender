export const BASE_URL="http://localhost:3002";

export const CATEGORIES = {
  DAIRY: 'dairy',
  SPICES: 'spices',
  FRUITS: 'fruits',
  VEGETABLES: 'vegetables',
  PANTRY: 'pantry',
};

export const UNITS = {
  PIECES: 'pcs',
  KILOGRAMS: 'kg',
  GRAMS: 'g',
  LITERS: 'l',
  MILLILITERS: 'ml',
};

export const DEFAULT_FORM_STATE = {
  name: '',
  quantity: 1,
  unit: UNITS.PIECES,
  category: CATEGORIES.PANTRY,
  lowStockThreshold: 2,
};