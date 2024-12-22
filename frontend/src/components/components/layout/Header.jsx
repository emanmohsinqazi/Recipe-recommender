import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiChevronDown } from 'react-icons/fi';
import Container from '../ui/Container';
import Button from '../ui/Button';
import CartDrawer from '../cart/CartDrawer';
import CategoryDropdown from '../category/CategoryDropdown';
import { useCart } from '../../../context/CartContext';
import { useProducts } from '../../../context/ProductContext';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryButtonRef = useRef(null);
  const { items } = useCart();
  const { setSearchQuery } = useProducts();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  // Close category dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryButtonRef.current && !categoryButtonRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-white py-4 px-6 shadow-sm">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <img src="/logo.png" alt="Grocery Store" className="h-12" />
              </div>
              <div className="relative" ref={categoryButtonRef}>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  <span>Category</span>
                  <FiChevronDown className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </Button>
                <CategoryDropdown 
                  isOpen={isCategoryOpen} 
                  onClose={() => setIsCategoryOpen(false)} 
                />
              </div>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
                <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <FiShoppingCart className="text-2xl" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              {/* <Button>Login</Button> */}
            </div>
          </div>
        </Container>
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}