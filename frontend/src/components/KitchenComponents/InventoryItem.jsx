import React from 'react';
import { AlertTriangle, Minus, Plus } from 'lucide-react';

export default function InventoryItem({ item, onUpdateQuantity }) {
  return (
    <div className="px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="font-medium">{item.name}</span>
        {item.quantity <= item.lowStockThreshold && (
          <span className="inline-flex items-center text-amber-600">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Low Stock
          </span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">
          {item.quantity} {item.unit}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.id, -1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Minus className="w-5 h-5" />
          </button>
          <button
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}