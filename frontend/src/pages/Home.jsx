import React from 'react';
import { Search, Heart, User } from 'lucide-react';
import Hero from '../components/Hero';
import RecipePost from './RecipePosts';

const Home = () => {
  return (

    <>
    <Hero/>
    <RecipePost/>
    </>
    // // <div className="bg-yellow-50 min-h-screen">
    //   {/* Navbar */}
    //   {/* <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
    //     <div className="flex items-center space-x-4">
    //       <img src="/apple-logo.png?height=32&width=32" alt="Apple Logo" className="w-8 h-8" />
    //       <span className="text-lg font-semibold">Smart Recipe Grocer</span>
    //     </div>
    //     <div className="hidden md:flex items-center space-x-6">
    //       <a href="#" className="text-gray-900 hover:text-gray-900">Home</a>
    //       <a href="#" className="text-gray-700 hover:text-gray-900">Shop</a>
    //       <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
    //     </div>
    //     <div className="flex items-center space-x-4">
    //       <div className="relative hidden md:block">
    //         <input
    //           type="text"
    //           placeholder="search"
    //           className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
    //         />
    //         <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    //       </div>
    //       <Heart className="text-gray-700 hover:text-red-500 cursor-pointer" size={24} />
    //       <User className="text-gray-700 hover:text-gray-900 cursor-pointer" size={24} />
    //     </div>
    //   </nav> */}

    //   {/* Mobile Menu Button */}
    //   {/* <div className="md:hidden absolute top-4 right-4">
    //     <button className="text-gray-700 hover:text-gray-900">
    //       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    //       </svg>
    //     </button>
    //   </div> */}

    //   {/* Hero Section */}
    //   {/* <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center">
    //     <div className="md:w-1/2 mb-8 md:mb-0">
    //       <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'cursive' }}>Generate Recipe</h1>
    //       <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
    //         Lets Generate
    //       </button>
    //     </div>
    //     <div className="md:w-1/2">
    //       <img
    //         src="/basket-image.png?height=300&width=300 rounded-full"
    //         alt="Fruit Basket"
    //         className="w-full max-w-md mx-auto"
    //       />
    //     </div>
    //   </div> */}
    // {/* </div> */}

 
  );
};

export default Home;