/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react';
// import InventoryItem from './InventoryItem';

// export default function CategoryGroup({ category, items, onUpdateQuantity }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <h3 className="bg-gray-50 px-6 py-3 text-lg font-semibold capitalize">
//         {category}
//       </h3>
//       <div className="divide-y divide-gray-200">
//         {items.map((item) => (
//           <InventoryItem
//             key={item.id}
//             item={item}
//             onUpdateQuantity={onUpdateQuantity}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function CategoryGroup({ category, items, onUpdateQuantity }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{category}</h3>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity} {item.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

