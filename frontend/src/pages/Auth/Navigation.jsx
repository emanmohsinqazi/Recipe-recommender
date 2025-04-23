"use client"

import { useState } from "react"
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
} from "react-icons/ai"
import { FaHeart } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Navigation.css"
import { useSelector, useDispatch } from "react-redux"
import { useLogoutMutation } from "../../redux/api/usersApiSlice"
import { logout } from "../../redux/features/auth/authSlice"

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const closeSidebar = () => {
    setShowSidebar(false)
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/login")
    } catch (error) {
      console.error(error)
    }
  }

  // Common sidebar container styles - modernized
  const sidebarContainerClass = `
    ${showSidebar ? "hidden" : "flex"}
    xl:flex lg:flex md:hidden sm:hidden
    flex-col justify-between p-3 text-black
    bg-white/95 backdrop-blur-sm w-[4%] hover:w-[15%] h-[100vh] fixed
    transition-all duration-300 ease-in-out
    shadow-xl border-r border-gray-100
  `

  // Common link styles - modernized
  const linkClass =
    "flex items-center relative rounded-lg my-1 px-3 py-2.5 transition-all duration-200 hover:bg-gray-50 group"

  // Common icon styles - modernized
  const iconClass = "text-gray-600 group-hover:text-blue-500 transition-colors duration-200"

  // Common text styles - modernized
  const textClass =
    "hidden nav-item-name font-medium ml-3 text-gray-600 group-hover:text-blue-500 transition-colors duration-200"

  return (
    <div style={{ zIndex: 9999 }} className={sidebarContainerClass} id="navigation-container">
      <div className="flex flex-col justify-start space-y-1 mt-6">
        {userInfo && !userInfo.isAdmin ? (
          // User Navigation
          <>
            <Link to="/home" className={linkClass}>
              <div className="icon-wrapper">
                <AiOutlineHome className={iconClass} size={22} />
              </div>
              <span className={textClass}>Home</span>
              <span className="nav-indicator"></span>
            </Link>

            <Link to="/shop" className={linkClass}>
              <div className="icon-wrapper">
                <AiOutlineShopping className={iconClass} size={22} />
              </div>
              <span className={textClass}>Shop</span>
              <span className="nav-indicator"></span>
            </Link>

            <Link to="/cart" className={linkClass}>
              <div className="icon-wrapper">
                <div className="relative">
                  <AiOutlineShoppingCart className={iconClass} size={22} />
                  <span className="cart-badge">0</span>
                </div>
              </div>
              <span className={textClass}>Cart</span>
              <span className="nav-indicator"></span>
            </Link>

            <Link to="/favorite" className={linkClass}>
              <div className="icon-wrapper">
                <FaHeart className={`${iconClass} text-pink-400 group-hover:text-pink-500`} size={18} />
              </div>
              <span className={textClass}>Favorites</span>
              <span className="nav-indicator"></span>
            </Link>
          </>
        ) : userInfo && userInfo.isAdmin ? (
          // Admin Navigation
          <>
            <Link to="/admin/dashboard" className={linkClass}>
              <div className="icon-wrapper">
                <AiOutlineDashboard className={iconClass} size={22} />
              </div>
              <span className={textClass}>Dashboard</span>
              <span className="nav-indicator"></span>
            </Link>

            <Link to="/admin/productlist" className={linkClass}>
              <div className="icon-wrapper">
                <AiOutlineShoppingCart className={iconClass} size={22} />
              </div>
              <span className={textClass}>Create Product</span>
              <span className="nav-indicator"></span>
            </Link>

            <Link to="/admin/allproductslist" className={linkClass}>
              <div className="icon-wrapper">
                <AiOutlineAppstore className={iconClass} size={22} />
              </div>
              <span className={textClass}>All Products</span>
              <span className="nav-indicator"></span>
            </Link>

            <Link to="/admin/orderlist" className={linkClass}>
              <div className="icon-wrapper">
                <AiOutlineOrderedList className={iconClass} size={22} />
              </div>
              <span className={textClass}>Orders</span>
              <span className="nav-indicator"></span>
            </Link>

            <Link to="/admin/categorylist" className={linkClass}>
              <div className="icon-wrapper">
                <AiOutlineTags className={iconClass} size={22} />
              </div>
              <span className={textClass}>Categories</span>
              <span className="nav-indicator"></span>
            </Link>

            <Link to="/admin/userlist" className={linkClass}>
              <div className="icon-wrapper">
                <AiOutlineUser className={iconClass} size={22} />
              </div>
              <span className={textClass}>Users</span>
              <span className="nav-indicator"></span>
            </Link>
          </>
        ) : (
          // Guest Navigation (not logged in)
          <>
            <Link to="/login" className={linkClass}>
              <div className="icon-wrapper">
                <AiOutlineLogin className={iconClass} size={22} />
              </div>
              <span className={textClass}>Login</span>
              <span className="nav-indicator"></span>
            </Link>

            <Link to="/register" className={linkClass}>
              <div className="icon-wrapper">
                <AiOutlineUserAdd className={iconClass} size={22} />
              </div>
              <span className={textClass}>Register</span>
              <span className="nav-indicator"></span>
            </Link>
          </>
        )}
      </div>

      {userInfo && (
        <div className="mt-auto mb-4 px-2">
          <button
            onClick={toggleDropdown}
            className="flex items-center w-full rounded-lg p-2 hover:bg-gray-50 transition-all duration-200"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 shadow-sm">
              <span className="text-sm font-medium text-gray-700">
                {userInfo.username?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <span className="hidden nav-item-name ml-3 text-sm font-medium text-gray-700 truncate max-w-[80px]">
              {userInfo.username}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`hidden nav-item-name h-4 w-4 ml-auto transition-transform text-gray-500 ${
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
            <div className="  bottom-14 absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
              <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <AiOutlineUser className="mr-2" size={16} />
                Profile
              </Link>
              <div className="border-t border-gray-100">
                <button
                  onClick={logoutHandler}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <AiOutlineLogin className="mr-2" size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Navigation
