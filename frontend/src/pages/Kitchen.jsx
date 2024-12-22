import  { useState } from 'react';
import Header from '../components/KitchenComponents/Header';
import AddItemForm from '../components/KitchenComponents/AddItemForm';
import InventoryList from '../components/KitchenComponents/InventoryList';

function Kitchen() {
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems([
      ...items,
      {
        ...newItem,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const handleUpdateQuantity = (id, change) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto py-8 px-4">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AddItemForm onAddItem={handleAddItem} />
          </div>
          
          <div className="lg:col-span-2">
            <InventoryList
              items={items}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kitchen;