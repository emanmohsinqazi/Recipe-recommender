import React, { useState } from 'react';

const RecipeCard = ({ title, description, imageUrl }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        className="h-48 w-full object-cover"
        src={imageUrl}
        alt={title}
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleLikeClick}
            className={`${
              isLiked ? 'text-red-500' : 'text-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            aria-label={isLiked ? `Unlike ${title}` : `Like ${title}`}
          >
            <svg
              className="h-6 w-6"
              fill={isLiked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const RecipeCards = () => {
  const recipes = [
    {
      id: 1,
      title: "Creamy Garlic Parmesan Pasta",
      description: "A rich and indulgent pasta dish that's perfect for a cozy night in.",
      imageUrl: "/pasta.png"
    },
    {
      id: 2,
      title: "Spicy Thai Basil Chicken",
      description: "A flavorful and aromatic Thai dish with a perfect balance of heat and sweetness.",
      imageUrl: "/chicken-kurma.png"
    },
    {
      id: 3,
      title: "Classic Margherita Pizza",
      description: "A simple yet delicious pizza topped with fresh mozzarella, tomatoes, and basil.",
      imageUrl: "/margerita.png"
    },
    {
      id: 4,
      title: "Hearty Vegetable Soup",
      description: "A comforting soup packed with a variety of nutritious vegetables and herbs.",
      imageUrl: "soup.png"
    },
    {
      id: 5,
      title: "Chocolate Lava Cake",
      description: "A decadent dessert with a gooey chocolate center that flows like lava.",
      imageUrl: "/chocolate-lava.png"
    },
    {
      id: 6,
      title: "Grilled Salmon with Lemon Butter",
      description: "Perfectly grilled salmon fillet served with a zesty lemon butter sauce.",
      imageUrl: "/grilled-selmon.png"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Favorite Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            description={recipe.description}
            imageUrl={recipe.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeCards;