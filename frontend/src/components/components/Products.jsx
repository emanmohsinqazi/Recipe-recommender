import { useProducts } from '../../context/ProductContext';
import ProductCard from './product/ProductCard';

export default function Products() {
  const { products } = useProducts();

  return (
    <div className="max-w-7xl mx-auto my-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Popular Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No products found</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}