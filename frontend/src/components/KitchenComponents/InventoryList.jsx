import React from 'react';
import { groupItemsByCategory } from '../../utils/itemHelpers';
import CategoryGroup from './CategoryGroup';

export default function InventoryList({ items, onUpdateQuantity }) {
  const groupedItems = groupItemsByCategory(items);

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <CategoryGroup
          key={category}
          category={category}
          items={categoryItems}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </div>
  );
}