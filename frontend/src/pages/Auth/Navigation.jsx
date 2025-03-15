import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineOrderedList,
  AiOutlineAppstore,
  AiOutlineTags,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Common sidebar container styles
  const sidebarContainerClass = `
    ${showSidebar ? "hidden" : "flex"}
    xl:flex lg:flex md:hidden sm:hidden
    flex-col justify-between p-4 text-white
    bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed
    transition-all duration-300 ease-in-out
  `;

  // Common link styles
  const linkClass =
    "flex items-center transition-transform transform hover:translate-x-2 py-3";

  // Common icon styles
  const iconClass = "mr-3 text-gray-300";

  // Common text styles
  const textClass = "hidden nav-item-name font-medium text-gray-300";

  return (
    <div
      style={{ zIndex: 9999 }}
      className={sidebarContainerClass}
      id="navigation-container"
    >
      <div className="flex flex-col justify-start space-y-2 mt-10">
        {userInfo && !userInfo.isAdmin ? (
          // User Navigation
          <>
            <Link to="/home" className={linkClass}>
              <AiOutlineHome className={iconClass} size={24} />
              <span className={textClass}>Home</span>
            </Link>

            <Link to="/shop" className={linkClass}>
              <AiOutlineShopping className={iconClass} size={24} />
              <span className={textClass}>Shop</span>
            </Link>

            <Link to="/cart" className={linkClass}>
              <div className="relative">
                <AiOutlineShoppingCart className={iconClass} size={24} />
                {/* Cart count can be added here */}
              </div>
              <span className={textClass}>Cart</span>
            </Link>

            <Link to="/favorite" className={linkClass}>
              <FaHeart className={iconClass} size={20} />
              <span className={textClass}>Favorites</span>
            </Link>
          </>
        ) : userInfo && userInfo.isAdmin ? (
          // Admin Navigation
          <>
            <Link to="/admin/dashboard" className={linkClass}>
              <AiOutlineDashboard className={iconClass} size={24} />
              <span className={textClass}>Dashboard</span>
            </Link>

            <Link to="/admin/productlist" className={linkClass}>
              <AiOutlineShoppingCart className={iconClass} size={24} />
              <span className={textClass}>Create Product</span>
            </Link>

            <Link to="/admin/allproductslist" className={linkClass}>
              <AiOutlineAppstore className={iconClass} size={24} />
              <span className={textClass}>All Products</span>
            </Link>

            <Link to="/admin/orderlist" className={linkClass}>
              <AiOutlineOrderedList className={iconClass} size={24} />
              <span className={textClass}>Orders</span>
            </Link>

            <Link to="/admin/categorylist" className={linkClass}>
              <AiOutlineTags className={iconClass} size={24} />
              <span className={textClass}>Categories</span>
            </Link>

            <Link to="/admin/userlist" className={linkClass}>
              <AiOutlineUser className={iconClass} size={24} />
              <span className={textClass}>Users</span>
            </Link>
          </>
        ) : (
          // Guest Navigation (not logged in)
          <>
            <Link to="/login" className={linkClass}>
              <AiOutlineLogin className={iconClass} size={24} />
              <span className={textClass}>Login</span>
            </Link>

            <Link to="/register" className={linkClass}>
              <AiOutlineUserAdd className={iconClass} size={24} />
              <span className={textClass}>Register</span>
            </Link>
          </>
        )}
      </div>

      {userInfo && (
        <div className="relative mb-4">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-300 hover:text-white focus:outline-none transition-colors"
          >
            <span className="text-sm font-medium mr-2 truncate max-w-[80px]">
              {userInfo.username}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          </button>

          {dropdownOpen && (
            <ul className="absolute bottom-full mb-2 right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
