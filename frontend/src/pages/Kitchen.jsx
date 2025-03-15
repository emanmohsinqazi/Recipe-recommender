import React, { useState } from 'react';
import { Search, Plus, Trash2, AlertCircle, Minus, Edit2, Check, X } from 'lucide-react';

const initialInventory = [
  { id: 1, name: 'Tomatoes', category: 'vegetables', quantity: 5, unit: 'kg', lowThreshold: 2 },
  { id: 2, name: 'Milk', category: 'dairy', quantity: 2, unit: 'L', lowThreshold: 1 },
  { id: 3, name: 'Apples', category: 'fruits', quantity: 8, unit: 'kg', lowThreshold: 3 },
  { id: 4, name: 'Rice', category: 'ingredients', quantity: 3, unit: 'kg', lowThreshold: 5 }
];

const units = ['kg', 'L', 'pcs', 'g'];

function Kitchen() {
  const [inventory, setInventory] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newItem, setNewItem] = useState({ 
    name: '', 
    category: 'ingredients', 
    quantity: 1, 
    unit: 'kg',
    lowThreshold: 1
  });
  const [editItem, setEditItem] = useState({});

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    
    setInventory([
      ...inventory,
      {
        id: Date.now(),
        ...newItem
      }
    ]);
    setNewItem({ name: '', category: 'ingredients', quantity: 1, unit: 'kg', lowThreshold: 1 });
  };

  const removeItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditItem({ ...item });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditItem({});
  };

  const saveEdit = () => {
    setInventory(inventory.map(item => 
      item.id === editingId ? { ...editItem } : item
    ));
    setEditingId(null);
    setEditItem({});
  };

  const decreaseQuantity = (id) => {
    setInventory(inventory.map(item => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: Math.max(0, item.quantity - 1) };
      }
      return item;
    }));
  };

  const increaseQuantity = (id) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  };

  const isLowQuantity = (item) => item.quantity <= item.lowThreshold;

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">Kitchen Management System</h1>
        <p className="text-gray-400 mb-8">Track and manage your kitchen inventory efficiently</p>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full pl-12 pr-4 py-4 bg-[#1a1a1c] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add New Item Form */}
        <form onSubmit={addItem} className="mb-8 bg-[#1a1a1c] p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">Add New Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Item Name</label>
              <input
                type="text"
                placeholder="Enter item name"
                className="w-full px-4 py-3 bg-[#0f0f10] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Category</label>
              <select
                className="w-full px-4 py-3 bg-[#0f0f10] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              >
                <option value="ingredients">Ingredients</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy">Dairy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Quantity & Unit</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  className="flex-1 px-4 py-3 bg-[#0f0f10] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) })}
                />
                <select
                  className="px-4 py-3 bg-[#0f0f10] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Low Stock Alert</label>
              <div className="flex items-end gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  className="flex-1 px-4 py-3 bg-[#0f0f10] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newItem.lowThreshold}
                  onChange={(e) => setNewItem({ ...newItem, lowThreshold: parseFloat(e.target.value) })}
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Plus size={20} /> Add
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Inventory List */}
        <div className="bg-[#1a1a1c] rounded-xl overflow-hidden">
          <div className="grid grid-cols-6 gap-4 p-6 border-b border-white/10 font-semibold">
            <div>Name</div>
            <div>Category</div>
            <div>Quantity</div>
            <div>Low Stock Alert</div>
            <div>Manage Stock</div>
            <div>Actions</div>
          </div>
          {filteredInventory.length === 0 ? (
            <div className="p-12 text-center text-white/60">
              No items found
            </div>
          ) : (
            filteredInventory.map(item => (
              <div 
                key={item.id} 
                className={`grid grid-cols-6 gap-4 p-6 border-b border-white/10 items-center transition-colors ${
                  isLowQuantity(item) ? 'bg-red-900/20' : ''
                }`}
              >
                {editingId === item.id ? (
                  <>
                    <div>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-[#0f0f10] rounded-lg"
                        value={editItem.name}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <select
                        className="w-full px-3 py-2 bg-[#0f0f10] rounded-lg"
                        value={editItem.category}
                        onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                      >
                        <option value="ingredients">Ingredients</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="dairy">Dairy</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="w-20 px-3 py-2 bg-[#0f0f10] rounded-lg"
                        value={editItem.quantity}
                        onChange={(e) => setEditItem({ ...editItem, quantity: parseFloat(e.target.value) })}
                      />
                      <select
                        className="px-3 py-2 bg-[#0f0f10] rounded-lg"
                        value={editItem.unit}
                        onChange={(e) => setEditItem({ ...editItem, unit: e.target.value })}
                      >
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        className="w-20 px-3 py-2 bg-[#0f0f10] rounded-lg"
                        value={editItem.lowThreshold}
                        onChange={(e) => setEditItem({ ...editItem, lowThreshold: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="p-2 text-green-400 hover:text-green-300 rounded-lg transition-colors"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-2 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-medium flex items-center gap-2">
                      {isLowQuantity(item) && (
                        <AlertCircle size={18} className="text-red-500" />
                      )}
                      {item.name}
                    </div>
                    <div className="capitalize">{item.category}</div>
                    <div>
                      {item.quantity} {item.unit}
                    </div>
                    <div className="text-white/60">
                      Alert when below {item.lowThreshold} {item.unit}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-2 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                        title="Use Item"
                      >
                        <Minus size={20} />
                      </button>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-2 text-green-400 hover:text-green-300 rounded-lg transition-colors"
                        title="Add Stock"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEditing(item)}
                        className="p-2 text-blue-400 hover:text-blue-300 rounded-lg transition-colors"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Kitchen;