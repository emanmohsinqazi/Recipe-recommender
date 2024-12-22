/* eslint-disable no-unused-vars */
import { Search, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./components/ui/Button";

const Header = () => {
  return (
    <>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={"/"} className="flex items-center space-x-4">
          <img
            src="/apple-logo.png?height=32&width=32"
            alt="Apple Logo"
            className="w-8 h-8"
          />
          <span className="text-lg font-semibold">Smart Recipe Grocer</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to={"/"} className="text-gray-900 hover:text-gray-900">
            Home
          </Link>
          <Link to={"/shop"} className="text-gray-700 hover:text-gray-900">
            Shop
          </Link>
          <Link to={"/kitchen"} className="text-gray-700 hover:text-gray-900">
            Kitchen
          </Link>
          <Link to={"/login"} className="text-gray-700 hover:text-gray-900">
            Login
          </Link>
        </div>
        {/* <div className="flex items-center space-x-4">
          <Button><Link to={'/'}>Login</Link></Button>
        </div> */}
      </nav>
    </>
  );
};

export default Header;
