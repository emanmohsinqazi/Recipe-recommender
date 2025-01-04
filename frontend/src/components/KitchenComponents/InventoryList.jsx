// import React from 'react';
// import { groupItemsByCategory } from '../../utils/itemHelpers';
// import CategoryGroup from './CategoryGroup';

// export default function InventoryList({ items, onUpdateQuantity }) {
//   const groupedItems = groupItemsByCategory(items);

//   return (
//     <div className="space-y-6">
//       {Object.entries(groupedItems).map(([category, categoryItems]) => (
//         <CategoryGroup
//           key={category}
//           category={category}
//           items={categoryItems}
//           onUpdateQuantity={onUpdateQuantity}
//         />
//       ))}
//     </div>
//   );
// }









// eslint-disable-next-line no-unused-vars
import React from 'react';
import { groupItemsByCategory } from '../../utils/itemHelpers';
import CategoryGroup from './CategoryGroup';

// eslint-disable-next-line react/prop-types
export default function InventoryList({ items, onUpdateQuantity }) {
  const groupedItems = groupItemsByCategory(items);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Inventory List</h2>
      <div className="space-y-8">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <CategoryGroup
            key={category}
            category={category}
            items={categoryItems}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </div>
  );
}

