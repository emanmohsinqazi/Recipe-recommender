import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { mockRecipes } from '../utils/mockData';

const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [showResults, setShowResults] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const handleFormSubmit = (data) => {
   
    setShowResults(true);
  };

  const handleToggleLike = (recipe) => {
    setLikedRecipes((prev) => {
      const isLiked = prev.some((r) => r.title === recipe.title);
      if (isLiked) {
        return prev.filter((r) => r.title !== recipe.title);
      }
      return [...prev, recipe];
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        showResults,
        likedRecipes,
        handleFormSubmit,
        handleToggleLike,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};


export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};