import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CATEGORIES, UNITS, DEFAULT_FORM_STATE } from '../../utils/constants';

export default function AddItemForm({ onAddItem }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(formData);
    setFormData(DEFAULT_FORM_STATE);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5" />
        Add New Item
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {Object.values(CATEGORIES).map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            {Object.entries(UNITS).map(([key, value]) => (
              <option key={value} value={value}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Low Stock Alert At</label>
          <input
            type="number"
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.lowStockThreshold}
            onChange={(e) => setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Item
      </button>
    </form>
  );
}