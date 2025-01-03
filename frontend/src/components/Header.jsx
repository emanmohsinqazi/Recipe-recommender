/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import { Search, Heart, User } from "lucide-react";
// import { Link } from "react-router-dom";
// import Button from "./components/ui/Button";

// const Header = () => {
//   return (
//     <>
//       <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <Link to={"/"} className="flex items-center space-x-4">
//           <img
//             src="/apple-logo.png?height=32&width=32"
//             alt="Apple Logo"
//             className="w-8 h-8"
//           />
//           <span className="text-lg font-semibold">Smart Recipe Grocer</span>
//         </Link>

//         <div className="hidden md:flex items-center space-x-6">
//           <Link to={"/"} className="text-gray-900 hover:text-gray-900">
//             Home
//           </Link>
//           <Link to={"/shop"} className="text-gray-700 hover:text-gray-900">
//             Shop
//           </Link>
//           <Link to={"/kitchen"} className="text-gray-700 hover:text-gray-900">
//             Kitchen
//           </Link>
//           <Link to={"/login"} className="text-gray-700 hover:text-gray-900">
//             Login
//           </Link>
//         </div>
//         {/* <div className="flex items-center space-x-4">
//           <Button><Link to={'/'}>Login</Link></Button>
//         </div> */}
//       </nav>
//     </>
//   );
// };

// export default Header;






// import { useState } from 'react';
// import { Search, Heart, User, Menu, X } from 'lucide-react';
// import { Link } from "react-router-dom";


// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   return (
//     <header className="bg-white shadow-sm">
//       <nav className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <Link to={"/"} className="flex items-center space-x-2">
//             <img
//               src="/apple-logo.png?height=32&width=32"
//               alt="Apple Logo"
//               className="w-8 h-8"
//             />
//             <span className="text-lg font-semibold text-gray-900">Smart Recipe Grocer</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             <NavLink to="/">Home</NavLink>
//             <NavLink to="/shop">Shop</NavLink>
//             <NavLink to="/kitchen">Kitchen</NavLink>
//             <NavLink to="/login">Login</NavLink>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
//             onClick={toggleMenu}
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>

//           {/* Action Icons */}
//           <div className="hidden md:flex items-center space-x-4">
           
//             <button className="text-gray-700 hover:text-gray-900">
//               <User size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 space-y-2">
//             <NavLink to="/" mobile onClick={toggleMenu}>Home</NavLink>
//             <NavLink to="/shop" mobile onClick={toggleMenu}>Shop</NavLink>
//             <NavLink to="/kitchen" mobile onClick={toggleMenu}>Kitchen</NavLink>
//             <NavLink to="/login" mobile onClick={toggleMenu}>Login</NavLink>
//             <div className="flex justify-between pt-2">
             
//               <button className="text-gray-700 hover:text-gray-900">
//                 <User size={20} />
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// const NavLink = ({ to, children, mobile, onClick }) => (
//   <Link
//     to={to}
//     className={`text-gray-700 hover:text-gray-900 transition-colors duration-200
//       ${mobile ? 'block py-2 border-b border-gray-200' : ''}`}
//     onClick={onClick}
//   >
//     {children}
//   </Link>
// );

// export default Header;





import { useState, useRef, useEffect } from 'react';
import { Menu, X, Edit, LogOut } from 'lucide-react';
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This should be replaced with your actual auth logic
  const userMenuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={"/"} className="flex items-center space-x-2">
            <img
              src="/apple-logo.png?height=32&width=32"
              alt="Apple Logo"
              className="w-8 h-8"
            />
            <span className="text-lg font-semibold text-gray-900">Smart Recipe Grocer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/kitchen">Kitchen</NavLink>
         
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src="/user-avatar.png?height=32&width=32"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">John Doe</span>
                </button>
                {isUserMenuOpen && <UserMenu />}
              </div>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavLink to="/" mobile onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/shop" mobile onClick={toggleMenu}>Shop</NavLink>
            <NavLink to="/kitchen" mobile onClick={toggleMenu}>Kitchen</NavLink>
            {isLoggedIn ? (
              <>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 w-full py-2 border-b border-gray-200 text-left"
                >
                  <img
                    src="/user-avatar.png?height=32&width=32"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">John Doe</span>
                </button>
                {isUserMenuOpen && <UserMenu mobile />}
              </>
            ) : (
              <NavLink to="/login" mobile onClick={toggleMenu}>Login</NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

const NavLink = ({ to, children, mobile, onClick }) => (
  <Link
    to={to}
    className={`text-gray-700 hover:text-gray-900 transition-colors duration-200
      ${mobile ? 'block py-2 border-b border-gray-200' : ''}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const UserMenu = ({ mobile }) => (
  <div className={`${mobile ? '' : 'absolute right-0 mt-2 w-48'} bg-white rounded-md shadow-lg py-1`}>
    <Link
      to="/edit-profile"
      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <Edit size={16} className="mr-2" />
      Edit Profile
    </Link>
    <button
      onClick={() => {/* Add logout logic here */}}
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <LogOut size={16} className="mr-2" />
      Logout
    </button>
  </div>
);

export default Header;

