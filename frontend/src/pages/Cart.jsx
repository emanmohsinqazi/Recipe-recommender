import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = cart;
  
  // Debug logging for component render and auth state
  console.log('Cart component rendered');
  console.log('userInfo state:', userInfo ? 'User is logged in' : 'User is not logged in');
  console.log('userInfo details:', userInfo);
  console.log('Cart state:', cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    console.log('checkoutHandler function called');
    try {
      if (userInfo) {
        console.log('User is authenticated, attempting to navigate to shipping page');
        // If user is already logged in, go directly to shipping
        navigate("/shipping");
        console.log('Navigation to /shipping attempted');
      } else {
        console.log('User is not authenticated, redirecting to login');
        // If user is not logged in, redirect to login with shipping as the next destination
        // The redirect parameter will be used after successful login to navigate the user to shipping
        navigate("/login?redirect=/shipping");
        console.log('Navigation to login page attempted');
      }
    } catch (error) {
      console.error("Navigation error:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      // You could add a toast notification here to inform the user
      // toast.error("There was a problem proceeding to checkout");
    }
  };

  return (
    <>
      <div className="container flex justify-around items-start  wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      $ {item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full hover:bg-pink-600 transition-colors"
                    disabled={cartItems.length === 0}
                    onClick={() => {
                      console.log('Checkout button clicked');
                      checkoutHandler();
                    }}
                    aria-label="Proceed to checkout"
                  >
                    {cartItems.length === 0 ? 'Your Cart is Empty' : 'Proceed To Checkout'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
