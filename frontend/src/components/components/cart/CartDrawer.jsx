/* eslint-disable react/prop-types */
import { FiX } from 'react-icons/fi';
import { useCart } from '../../../context/CartContext';
import CartItem from './CartItem';
import Button from '../ui/Button';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <FiX />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              items.map(item => <CartItem key={item.id} item={item} />)
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}