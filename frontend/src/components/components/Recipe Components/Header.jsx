import { Search, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* <div className="flex items-center space-x-4"> */}
          <Link to={"/"} className="flex items-center space-x-4" >
            <img
              src="/apple-logo.png?height=32&width=32"
              alt="Apple Logo"
              className="w-8 h-8"
            />
            <span className="text-lg font-semibold">Smart Recipe Grocer</span>
          </Link>
          {/* <img
            src="/apple-logo.png?height=32&width=32"
            alt="Apple Logo"
            className="w-8 h-8"
          />
          <span className="text-lg font-semibold">Smart Recipe Grocer</span> */}
        {/* </div> */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to={"/"} className="text-gray-900 hover:text-gray-900">
            Home
          </Link>
          <Link to={"/shop"} className="text-gray-700 hover:text-gray-900">
            Shop
          </Link>
          <Link to={"/login"} className="text-gray-700 hover:text-gray-900">
            Login
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="search"
              className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <Heart
            className="text-gray-700 hover:text-red-500 cursor-pointer"
            size={24}
          />
          {/* <User
            className="text-gray-700 hover:text-gray-900 cursor-pointer"
            size={24}
          /> */}
        </div>






        <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <Link to={"/cart"} className="btn btn-primary btn-block">View cart</Link>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        {/* <li><a>Settings</a></li> */}
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>








      </nav>

      <div className="md:hidden absolute top-4 right-4">
        <button className="text-gray-700 hover:text-gray-900">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Header;
