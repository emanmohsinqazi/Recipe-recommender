import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import favouriteRecipesReducer from "./favouriteRecipesSlice"



export const appStore = configureStore({
  reducer: {
    user: userReducer,
    favouriteRecipes:favouriteRecipesReducer,
   
  },
});
