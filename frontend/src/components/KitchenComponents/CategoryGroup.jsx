import React from 'react';
import InventoryItem from './InventoryItem';

export default function CategoryGroup({ category, items, onUpdateQuantity }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="bg-gray-50 px-6 py-3 text-lg font-semibold capitalize">
        {category}
      </h3>
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <InventoryItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </div>
  );
}