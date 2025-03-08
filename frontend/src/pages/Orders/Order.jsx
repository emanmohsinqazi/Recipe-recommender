import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import CreditCard from "../../components/CreditCard";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handlePaymentSuccess = async (cardData) => {
    try {
      await payOrder({
        orderId,
        details: {
          id: Date.now().toString(), // Generate a unique ID
          status: "COMPLETED",
          update_time: new Date().toISOString(),
          payer: {
            email_address: userInfo.email,
            name: cardData.name,
            payment_method: "Credit Card",
          },
          card: {
            last4: cardData.number.slice(-4),
            brand: "Credit Card",
            expiry: cardData.expiry,
          },
        },
      });
      refetch();
      toast.success("Payment successful!");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  // const handleCreditCardSubmit = (cardData) => {
  //   // Basic validation for credit card data
  //   if (!cardData || !cardData.number || !cardData.expiry || !cardData.cvc || !cardData.name) {
  //     toast.error("Please provide all required card information");
  //     return;
  //   }

  //   // Card number validation (simple Luhn algorithm check)
  //   const isCardNumberValid = validateCardNumber(cardData.number.replace(/\s/g, ''));
  //   if (!isCardNumberValid) {
  //     toast.error("Invalid card number");
  //     return;
  //   }

  //   // Check expiry date
  //   const [month, year] = cardData.expiry.split('/');
  //   const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
  //   const currentDate = new Date();

  //   if (expiryDate < currentDate) {
  //     toast.error("Card has expired");
  //     return;
  //   }

  //   // Show loading indicator
  //   toast.info("Processing payment...");

  //   // Simulate network delay for realism
  //   setTimeout(() => {
  //     // Simulate successful payment
  //     const paymentResult = {
  //       id: `sim_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
  //       status: "COMPLETED",
  //       update_time: new Date().toISOString(),
  //       payer: {
  //         email_address: userInfo.email,
  //         name: cardData.name,
  //         last4: cardData.number.slice(-4),
  //         card_type: getCardType(cardData.number)
  //       }
  //     };

  //     // Process the successful payment
  //     handlePaymentSuccess(paymentResult);
  //   }, 1500);
  // };

  // Replace PayPal/Stripe payment section with custom Credit Card component

  const handleCreditCardSubmit = (cardData) => {
    // Show loading state
    const toastId = toast.loading("Processing your payment...");

    try {
      // Additional validation beyond the basic form validation

      // 1. Check if card is expired
      const [month, year] = cardData.expiry.split("/");
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const currentDate = new Date();

      if (expiryDate < currentDate) {
        toast.update(toastId, {
          render: "Card has expired",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        return;
      }

      // 2. Basic card type validation
      const cardNumber = cardData.number.replace(/\s/g, "");
      let cardType = "unknown";

      if (/^4/.test(cardNumber)) cardType = "visa";
      else if (/^5[1-5]/.test(cardNumber)) cardType = "mastercard";
      else if (/^3[47]/.test(cardNumber)) cardType = "amex";
      else if (/^6(?:011|5)/.test(cardNumber)) cardType = "discover";

      // 3. Create a payment result object
      const paymentResult = {
        id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: "COMPLETED",
        update_time: new Date().toISOString(),
        payer: {
          email_address: userInfo.email,
          name: cardData.name,
          card_info: {
            last4: cardNumber.slice(-4),
            brand: cardType,
            exp_month: month,
            exp_year: year,
          },
        },
      };

      // 4. Simulate network delay for a more realistic experience
      setTimeout(() => {
        // Update toast to success
        toast.update(toastId, {
          render: "Payment processed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        // Call the payment success handler
        handlePaymentSuccess(paymentResult);
      }, 1500);
    } catch (error) {
      // Handle any errors
      toast.update(toastId, {
        render: `Payment processing error: ${error.message || "Unknown error"}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error("Payment error:", error);
    }
  };

  const renderPaymentSection = () => {
    if (!order) return null;

    if (order.isPaid) {
      return <Message variant="success">Paid on {order.paidAt}</Message>;
    }

    return (
      <div>
        {loadingPay && <Loader />}
        <CreditCard onSubmit={handleCreditCardSubmit} />
      </div>
    );
  };

  // Deliver order handler remains the same
  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Order {order._id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong> {order.user.email}
            </p>
            <p>
              <strong>Address: </strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </div>

          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p>
              <strong>Method: </strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
                  <div key={index} className="border-b pb-4 mb-4 flex">
                    <div className="w-20 mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-pink-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#181818] p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 border-b pb-4 mb-4">
            <div className="flex justify-between">
              <span>Items</span>
              <span>${order.itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${order.taxPrice}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${order.totalPrice}</span>
            </div>
          </div>

          {!order.isPaid && renderPaymentSection()}

          {loadingDeliver && <Loader />}
          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <button
                type="button"
                className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
                onClick={deliverHandler}
              >
                Mark As Delivered
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Order;
