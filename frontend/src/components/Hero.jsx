// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChefHat } from 'lucide-react';

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative overflow-hidden bg-white">
//       <div className="max-w-7xl mx-auto">
//         <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 lg:w-full lg:max-w-2xl">
//           <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
//             <div className="sm:text-center lg:text-left">
//               <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
//                 <span className="block">Discover Perfect</span>
//                 <span className="block text-emerald-600">Recipe Matches</span>
//               </h1>
//               <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
//                 Enter your ingredients and preferences to find personalized recipe recommendations. Our smart algorithm helps you cook delicious meals with what you have.
//               </p>
//               <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
//                 <div className="rounded-md shadow">
//                   <button
//                     onClick={() => navigate('/generate')}
//                     className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10"
//                   >
//                     <ChefHat className="w-5 h-5 mr-2" />
//                     Generate Recipe
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
//         <img
//           className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
//           src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
//           alt="Cooking ingredients"
//         />
//       </div>
//     </div>
//   );
// };

// export default Hero;












import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 lg:w-full lg:max-w-2xl">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Discover Perfect</span>{' '}
                <span className="block text-emerald-600 xl:inline">Recipe Matches</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Enter your ingredients and preferences to find personalized recipe recommendations. Our smart algorithm helps you cook delicious meals with what you have.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => navigate('/generate')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                  >
                    <ChefHat className="w-5 h-5 mr-2" />
                    Generate Recipe
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
          <img
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
            alt="Cooking ingredients"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

