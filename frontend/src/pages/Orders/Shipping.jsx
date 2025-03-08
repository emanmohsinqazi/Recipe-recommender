import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { toast } from "react-toastify";

const Shipping = () => {
  console.log('[Shipping] Component rendering started');
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log('[Shipping] Cart state:', cart);
  console.log('[Shipping] Shipping address from state:', shippingAddress);

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  console.log('[Shipping] Initial form state:', { 
    address, city, postalCode, country, paymentMethod 
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate the form fields
  const validateForm = () => {
    console.log('[Shipping] Validating form with values:', { 
      address, city, postalCode, country 
    });
    
    const newErrors = {};
    
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!postalCode.trim()) newErrors.postalCode = "Postal code is required";
    if (!country.trim()) newErrors.country = "Country is required";
    
    setErrors(newErrors);
    
    const isValid = Object.keys(newErrors).length === 0;
    console.log('[Shipping] Form validation result:', { isValid, errors: newErrors });
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('[Shipping] Form submitted');
    
    // Validate form before submission
    if (!validateForm()) {
      console.log('[Shipping] Form validation failed, aborting submission');
      toast.error("Please fill in all required fields");
      return;
    }
    
    console.log('[Shipping] Form validation passed, proceeding with submission');
    setIsSubmitting(true);
    
    try {
      console.log('[Shipping] Saving shipping address:', { address, city, postalCode, country });
      // Save shipping address and payment method to state
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      
      console.log('[Shipping] Saving payment method:', paymentMethod);
      dispatch(savePaymentMethod(paymentMethod));
      
      // Show success message
      toast.success("Shipping information saved");
      
      // Navigate to checkout page
      console.log('[Shipping] Attempting navigation to /checkout');
      navigate("/checkout");
      console.log('[Shipping] Navigation function called');
    } catch (error) {
      console.error('[Shipping] Error during form submission:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      console.log('[Shipping] Form submission process completed');
    }
  };

  // Removed infinite redirect loop effect
  // The user should be able to enter shipping information without being redirected

  // Add a debugging useEffect to track component mounts and updates
  useEffect(() => {
    console.log('[Shipping] Component mounted or updated');
    
    // Cleanup function to track unmounting
    return () => {
      console.log('[Shipping] Component will unmount');
    };
  }, []);

  console.log('[Shipping] Rendering component JSX');
  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
          <div className="mb-4">
            <label className="block text-gray-400">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">City</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Postal Code</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Country</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Select Method</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="Credit Card"
                  checked={paymentMethod === "Credit Card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">Credit Card</span>
              </label>
            </div>
          </div>
          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full disabled:bg-pink-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Continue to Checkout"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;