/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useProducts } from '../../../context/ProductContext';
import { FiChevronDown } from 'react-icons/fi';

export default function CategoryDropdown({ isOpen, onClose }) {
  const { categories, selectedCategory, setSelectedCategory } = useProducts();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 py-2">
      <div
        className="cursor-pointer px-4 py-2 hover:bg-gray-50"
        onClick={() => handleCategorySelect('all')}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🛒</span>
          <span className="text-gray-700">All Categories</span>
        </div>
      </div>
      
      {categories.map((category) => (
        <div
          key={category.id}
          className="cursor-pointer px-4 py-2 hover:bg-gray-50"
          onClick={() => handleCategorySelect(category.id)}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{category.icon}</span>
            <span className="text-gray-700">{category.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}