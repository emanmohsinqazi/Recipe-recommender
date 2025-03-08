import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BackBtn from "../../components/BackBtn";
import CreditCard from "../../components/CreditCard";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  
  // Get cart state from Redux
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  
  // Get user info for payment data
  const { userInfo } = useSelector((state) => state.auth);
  
  // Create order mutation
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  // Redirect to shipping if no shipping address or cart is empty
  useEffect(() => {
    if (!shippingAddress?.address) {
      toast.error("Please enter shipping address first");
      navigate("/shipping");
    } else if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
    }
  }, [shippingAddress, navigate, cartItems]);
  // Validate form and proceed to place order page
  const handleCreditCardSubmit = async (cardData) => {
    setIsProcessingPayment(true);

    try {
      // Basic card validation
      if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvc) {
        toast.error("Please fill in all credit card details");
        setIsProcessingPayment(false);
        return;
      }

      // Validate expiry date
      const [month, year] = cardData.expiry.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const currentDate = new Date();
      
      if (expiryDate < currentDate) {
        toast.error("Card has expired");
        setIsProcessingPayment(false);
        return;
      }

      // Create payment data to store in session
      const paymentData = {
        id: `sim_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
        status: "PENDING",
        update_time: new Date().toISOString(),
        payer: {
          email_address: userInfo?.email || "customer@example.com",
          name: cardData.name,
          last4: cardData.number.slice(-4),
          card_type: getCardType(cardData.number)
        }
      };

      // Save payment info in sessionStorage for PlaceOrder component
      sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
      
      // Set form as validated and navigate to place order page
      setFormValidated(true);
      toast.success("Payment information validated. Please review your order.");
      navigate('/placeorder');
      
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred during payment processing");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Simple utility to determine card type
  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (/^4/.test(number)) return "VISA";
    if (/^5[1-5]/.test(number)) return "MASTERCARD";
    if (/^3[47]/.test(number)) return "AMEX";
    if (/^6(?:011|5)/.test(number)) return "DISCOVER";
    return "UNKNOWN";
  };

  return (
    <div className="my-6 container mx-auto px-4">
      <BackBtn to={"/cart"}>Back to cart</BackBtn>
      
      {cartItems.length === 0 ? (
        <Message>Your cart is empty</Message>
      ) : (
        <div className="grid grid-cols-1 my-4 p-4 md:grid-cols-2 gap-8 card bg-base-300 shadow-xl">
          <section>
            <h2 className="text-2xl w-full text-center mb-4 card-title block">
              Order Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td>{item.qty}</td>
                      <td>${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td colSpan="2">Subtotal:</td>
                    <td>${cart.itemsPrice}</td>
                  </tr>
                  <tr className="font-semibold">
                    <td colSpan="2">Shipping:</td>
                    <td>${cart.shippingPrice}</td>
                  </tr>
                  <tr className="font-semibold">
                    <td colSpan="2">Tax:</td>
                    <td>${cart.taxPrice}</td>
                  </tr>
                  <tr className="font-semibold text-lg">
                    <td colSpan="2">Total:</td>
                    <td>${cart.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 border border-base-200 rounded-lg">
              <h3 className="text-xl mb-2">Shipping Address</h3>
              <p>
                {shippingAddress.address}, {shippingAddress.city},
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl mb-4 card-title w-full block text-center">
              Payment Details
            </h2>
            {isProcessingPayment ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader />
                <p className="mt-4">Validating payment details...</p>
              </div>
            ) : (
              <>
                <p className="text-center mb-4">
                  Enter your payment details to continue to order review
                </p>
                <CreditCard onSubmit={handleCreditCardSubmit} />
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Your payment will not be processed until you review and place your order</p>
                </div>
              </>
            )}
            {error && (
              <div className="mt-4">
                <Message variant="error">
                  {error?.data?.message || "An error occurred during checkout"}
                </Message>
              </div>
            )}
          </section>
        </div>
      )}
      
      {isLoading && <Loader />}
    </div>
  );
};

export default Checkout;
