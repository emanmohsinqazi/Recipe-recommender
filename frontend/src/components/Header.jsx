/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Updated import
import { Menu, X, Edit, LogOut, User } from "lucide-react";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {  toast } from 'react-toastify';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate(); // Hook to navigate programmatically

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      setIsUserMenuOpen(false);
      toast.success("Logout Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate("/login"); // Use navigate to go to login page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/apple-logo.png?height=32&width=32"
              alt="Apple Logo"
              className="w-8 h-8"
            />
            <span className="text-lg font-semibold text-gray-900">
              Smart Recipe Grocer
            </span>
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
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User Menu */}
          <div className="hidden md:block">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-label="User menu"
                >
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={20} className="text-gray-500" />
                    </div>
                  )}
                  <span className="text-gray-700">{user.firstName}</span>
                </button>
                {isUserMenuOpen && <UserMenu handleLogout={handleLogout} />}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavLink to="/" mobile onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/shop" mobile onClick={toggleMenu}>
              Shop
            </NavLink>
            <NavLink to="/kitchen" mobile onClick={toggleMenu}>
              Kitchen
            </NavLink>
            {user ? (
              <>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 w-full py-2 border-b border-gray-200 text-left"
                >
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={20} className="text-gray-500" />
                    </div>
                  )}
                  <span className="text-gray-700">{user.firstName}</span>
                </button>
                {isUserMenuOpen && (
                  <UserMenu mobile handleLogout={handleLogout} />
                )}
              </>
            ) : (
              <NavLink to="/login" mobile onClick={toggleMenu}>
                Login
              </NavLink>
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
      ${mobile ? "block py-2 border-b border-gray-200" : ""}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const UserMenu = ({ mobile, handleLogout }) => (
  <div
    className={`${
      mobile ? "" : "absolute right-0 mt-2 w-48"
    } bg-white rounded-md shadow-lg py-1 z-10`}
  >
    <Link
      to="/edit-profile"
      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <Edit size={16} className="mr-2" />
      Edit Profile
    </Link>
    <button
      onClick={handleLogout}
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <LogOut size={16} className="mr-2" />
      Logout
    </button>
  </div>
);

export default Header;
