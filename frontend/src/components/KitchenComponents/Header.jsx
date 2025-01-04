// import React from 'react';
// import { Utensils } from 'lucide-react';

// export default function Header() {
//   return (
//     <header className="mb-8">
//       <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//         <Utensils className="w-8 h-8" />
//         Kitchen 
//       </h1>
//     </header>
//   );
// }



// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Utensils } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
        <Utensils className="w-10 h-10 text-indigo-600" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Kitchen Inventory
        </span>
      </h1>
      <p className="mt-2 text-xl text-gray-600">Manage your kitchen supplies with ease</p>
    </header>
  );
}

