import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const FavoritesModal = ({ isOpen, onClose, recipes }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl relative max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Recipes</h2>
          
          <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
            {recipes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                You haven't liked any recipes yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.title}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{recipe.title}</h3>
                      <p className="text-sm text-gray-600">
                        {recipe.calories} cal · {recipe.cookTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



export default FavoritesModal;