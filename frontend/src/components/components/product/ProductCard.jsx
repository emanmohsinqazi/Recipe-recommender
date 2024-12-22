/* eslint-disable react/prop-types */
import { useCart } from '../../../context/CartContext';
import Button from '../ui/Button';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { name, price, oldPrice, image } = product;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <img src={image} alt={name} className="w-full h-48 object-contain mb-4" />
      <h3 className="text-lg font-medium text-gray-800 mb-2">{name}</h3>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold text-gray-900">${price}</span>
        {oldPrice && (
          <span className="text-sm text-gray-500 line-through">${oldPrice}</span>
        )}
      </div>
      <Button 
        variant="secondary" 
        className="w-full"
        onClick={() => addToCart(product)}
      >
        Add to cart
      </Button>
    </div>
  );
}