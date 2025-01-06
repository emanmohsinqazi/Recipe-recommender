import { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import Header from "../components/KitchenComponents/Header";
import AddItemForm from "../components/KitchenComponents/AddItemForm";
import InventoryList from "../components/KitchenComponents/InventoryList";
import { BASE_URL } from "../utils/constants";

function Kitchen() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/kitchen/items",

        { withCredentials: true }
      );

      // Ensure data is an array
      if (Array.isArray(response.data)) {
        setItems(response.data);
        setError(null);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to fetch items. ");
    }
  };

  const sendItemsToBackend = async (item) => {
    try {
      console.log("Sending item to backend:", item);
      const res = await axios.post(
        BASE_URL + "/kitchen/items",
        {
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          unit: item.unit,
          lowStockThreshold: item.lowStockThreshold,
        },
        { withCredentials: true }
      );
      console.log("Item saved:", res.data);
      setError(null);
    } catch (error) {
      console.error(
        "Error saving item:",
        error.response?.data || error.message
      );
      setError("Failed to save item. Please check the input.");
    }
  };

  const handleAddItem = (newItem) => {
    const item = {
      ...newItem,

      quantity: newItem.quantity || 0,
    };

    setItems((prevItems) => [...prevItems, item]); // Update the UI
    sendItemsToBackend(item); // Send the single item to the backend
  };

  const handleUpdateQuantity = async (id, change) => {
    console.log("Button Clicked->id: ", id);

    const updatedItems = items.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    );

    setItems(updatedItems); // Update the UI optimistically

    const updatedItem = updatedItems.find((item) => item._id === id); // Find the specific updated item

    try {
      const endpoint =
        change > 0
          ? `/kitchen/items/${id}/increment`
          : `/kitchen/items/${id}/decrement`;
      await axios.patch(BASE_URL + endpoint, {}, { withCredentials: true });

      // After the update, refetch the items to ensure the UI is in sync
      fetchItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Failed to update item quantity.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Header />

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <AddItemForm onAddItem={handleAddItem} />
          </div>

          <div className="lg:col-span-2">
            <InventoryList
              items={Array.isArray(items) ? items : []} // Safeguard to prevent errors
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kitchen;
