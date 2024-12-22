import { useProducts } from '../../context/ProductContext';
import CategoryCard from './category/CategoryCard';

export default function Categories() {
  const { categories, selectedCategory, setSelectedCategory } = useProducts();

  return (
    <div className="max-w-7xl mx-auto my-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Shop by Category</h2>
      <div className="grid grid-cols-7 gap-4">
        <div
          className={`bg-green-50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow ${
            selectedCategory === 'all' ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setSelectedCategory('all')}
        >
          <span className="text-4xl mb-2">🛒</span>
          <span className="text-sm font-medium text-gray-700">All</span>
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`cursor-pointer ${
              selectedCategory === category.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}