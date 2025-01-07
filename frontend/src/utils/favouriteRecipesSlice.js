import { createSlice } from "@reduxjs/toolkit";

const favouriteRecipesSlice = createSlice({
  name: "favouriteRecipes",
  initialState: [],
  reducers: {
    addRecipes: (state, action) => {
      return action.payload;
    },
    removeRecipes: (state, action) => {
      return [];
    },
  },
});

export const {addRecipes, removeRecipes}=favouriteRecipesSlice.actions;
export default favouriteRecipesSlice.reducer;
