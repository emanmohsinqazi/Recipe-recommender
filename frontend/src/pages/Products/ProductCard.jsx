import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div
      className="relative bg-[#1A1A1A] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800 h-[420px] w-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section - fixed height */}
      <div className="relative overflow-hidden group h-[220px] w-full flex-shrink-0">
        <Link to={`/product/${p._id}`} className="block h-full">
          <div className="h-full w-full">
            <img
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              src={p.image || "/placeholder.svg"}
              alt={p.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>

        {/* Quick action buttons */}
        <div className="absolute top-3 right-3 z-10">
          <HeartIcon product={p} />
        </div>

        {/* Brand badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-pink-500/90 text-white backdrop-blur-sm">
            {p?.brand}
          </span>
        </div>

        {/* Quick view button - appears on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            to={`/product/${p._id}`}
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <AiOutlineEye size={22} />
          </Link>
        </div>
      </div>

      {/* Content section - flex-grow to fill remaining space */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-white line-clamp-1 mr-2">
              {p?.name}
            </h3>
            <p className="text-pink-500 font-bold whitespace-nowrap">
              {p?.price?.toLocaleString("en-PK", {
                style: "currency",
                currency: "PKR",
              })}
            </p>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2 h-[40px]">
            {p?.description || "No description available"}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-pink-700 rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all duration-300 shadow-sm"
          >
            Details
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors duration-300 flex items-center justify-center"
            onClick={() => addToCartHandler(p, 1)}
            aria-label="Add to cart"
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
