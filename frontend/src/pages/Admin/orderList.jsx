import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery, useDeliverOrderMutation } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";

const OrderList = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery({}, {
    // Polling interval for real-time updates (every 15 seconds)
    pollingInterval: 15000,
    refetchOnMountOrArgChange: true,
  });
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const confirmOrderHandler = async (orderId) => {
    // Show loading toast
    const toastId = toast.loading("Confirming order...");
    
    try {
      // Mark the order as delivered
      await deliverOrder(orderId).unwrap();
      
      // Immediate refetch to update the UI
      await refetch();
      
      // Update toast to success
      toast.update(toastId, {
        render: "Order confirmed successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      
      // Force another refetch after a delay to ensure data is completely synchronized
      setTimeout(() => {
        refetch();
      }, 2000);
    } catch (err) {
      // Update toast to show error
      toast.update(toastId, {
        render: err?.data?.message || "Failed to confirm order",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className="container mx-auto">
          <AdminMenu />

          <thead className="w-full border">
            <tr className="mb-[5rem]">
              <th className="text-left pl-1">ITEMS</th>
              <th className="text-left pl-1">ID</th>
              <th className="text-left pl-1">USER</th>
              <th className="text-left pl-1">DATA</th>
              <th className="text-left pl-1">TOTAL</th>
              <th className="text-left pl-1">PAID</th>
              <th className="text-left pl-1">DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td>{order._id}</td>

                <td>{order.user ? order.user.username : "N/A"}</td>

                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>

                <td>$ {order.totalPrice}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td>
                  <div className="flex space-x-2">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded">Details</button>
                    </Link>
                    {!order.isDelivered && (
                      <button 
                        onClick={() => confirmOrderHandler(order._id)}
                        disabled={loadingDeliver}
                        className={`text-white px-2 py-1 rounded ${loadingDeliver ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'}`}
                      >
                        {loadingDeliver ? 'Processing...' : 'Confirm Order'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderList;