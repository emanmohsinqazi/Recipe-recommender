// import React, { useState } from 'react';
// import { CookingPot, Heart } from 'lucide-react';
// import AuthButton from './AuthButton';
// import SignInModal from './SignInModal';
// import SignUpModal from './SignUpModal';
// import FavoritesModal from './FavoritesModal';
// // import { useAuth } from '../context/AuthContext';
// import { useRecipes } from '../context/RecipeContext';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { isLoggedIn, username, handleSignIn, handleSignUp, handleSignOut } = useAuth
//   // console.log('Auth context:', auth);
//   const { likedRecipes } = useRecipes();
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [showFavorites, setShowFavorites] = useState(false);

//   const onSignIn = (credentials) => {
//     handleSignIn(credentials);
//     setShowSignIn(false);
//   };

//   const onSignUp = (userData) => {
//     handleSignUp(userData);
//     setShowSignUp(false);
//   };

//   return (
//     <>
//       <nav className="bg-emerald-600 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-3">
//               <CookingPot className="h-8 w-8" />
//               <span className="font-bold text-xl">NutriChef</span>
//             </div>
//             <div className="flex items-center space-x-6">
//               {isLoggedIn && (
//                 <button
//                   onClick={() => setShowFavorites(true)}
//                   className="flex items-center space-x-2 hover:text-emerald-200 transition-colors"
//                 >
//                   <Heart className="h-5 w-5" />
//                   <span className="text-sm">
//                     Favorites ({likedRecipes.length})
//                   </span>
//                 </button>
//               )}
//               <AuthButton
//                 isLoggedIn={isLoggedIn}
//                 username={username}
//                 onSignIn={() => setShowSignIn(true)}
//                 onSignUp={() => setShowSignUp(true)}
//                 onSignOut={handleSignOut}
//               />
//             </div>
//           </div>
//         </div>
//       </nav>

//       <SignInModal
//         isOpen={showSignIn}
//         onClose={() => setShowSignIn(false)}
//         onSignIn={onSignIn}
//       />

//       <SignUpModal
//         isOpen={showSignUp}
//         onClose={() => setShowSignUp(false)}
//         onSignUp={onSignUp}
//       />

//       <FavoritesModal
//         isOpen={showFavorites}
//         onClose={() => setShowFavorites(false)}
//         recipes={likedRecipes}
//       />
//     </>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { CookingPot, Heart } from 'lucide-react';
import AuthButton from './AuthButton';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import FavoritesModal from './FavoritesModal';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  // Corrected the useAuth call
  const { isLoggedIn, username, handleSignIn, handleSignUp, handleSignOut } = useAuth();
  const { likedRecipes } = useRecipes();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const onSignIn = (credentials) => {
    handleSignIn(credentials);
    setShowSignIn(false);
  };

  const onSignUp = (userData) => {
    handleSignUp(userData);
    setShowSignUp(false);
  };

  return (
    <>
      <nav className="bg-emerald-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <CookingPot className="h-8 w-8" />
              <span className="font-bold text-xl">NutriChef</span>
            </div>
            <div className="flex items-center space-x-6">
              {isLoggedIn && (
                <button
                  onClick={() => setShowFavorites(true)}
                  className="flex items-center space-x-2 hover:text-emerald-200 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">
                    Favorites ({likedRecipes.length})
                  </span>
                </button>
              )}
              <AuthButton
                isLoggedIn={isLoggedIn}
                username={username}
                onSignIn={() => setShowSignIn(true)}
                onSignUp={() => setShowSignUp(true)}
                onSignOut={handleSignOut}
              />
            </div>
          </div>
        </div>
      </nav>

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSignIn={onSignIn}
      />

      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSignUp={onSignUp}
      />

      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        recipes={likedRecipes}
      />
    </>
  );
};

export default Navbar;
