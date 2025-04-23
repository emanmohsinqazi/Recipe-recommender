"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/features/cart/cartSlice"
import { toast } from "react-toastify"
import HeartIcon from "./HeartIcon"

const ProductCard = ({ p }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const dispatch = useDispatch()

  const addToCartHandler = (product, qty) => {
    setIsAddingToCart(true)

    // Add to cart
    dispatch(addToCart({ ...product, qty }))

    // Show success toast
    toast.success("Added to your cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: "linear-gradient(to right, #bfdbfe, #e9d5ff)",
        color: "#1e293b",
        borderRadius: "8px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      },
      icon: <AiOutlineShoppingCart size={24} />,
    })

    // Reset button state after a short delay
    setTimeout(() => setIsAddingToCart(false), 500)
  }

  return (
    <div
      className="group relative bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.07)] hover:shadow-[0_15px_30px_rgba(191,219,254,0.4)] transition-all duration-500 h-[380px] w-full border border-white/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sale badge - if product is on sale */}
      {p.discountPercentage && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md backdrop-blur-sm border border-white/20">
          {Math.round(p.discountPercentage)}% OFF
        </div>
      )}

      {/* Wishlist button */}
      <div className="absolute top-4 right-4 z-20">
        <HeartIcon product={p} />
      </div>

      {/* Image container */}
      <div className="relative h-[220px] w-full overflow-hidden bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm border-b border-white/50">
        <Link to={`/product/${p._id}`}>
          <img
            src={p.image || "/placeholder.svg"}
            alt={p.name}
            className={`w-full h-full object-contain transition-all duration-700 ease-in-out ${
              isHovered ? "scale-110 filter brightness-105" : "scale-100"
            }`}
          />
        </Link>

        {/* Quick shop overlay - appears on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/15 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex gap-2">
            <Link
              to={`/product/${p._id}`}
              className="p-3 rounded-full bg-gradient-to-r from-white/80 to-white/90 text-gray-800 hover:from-white hover:to-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 backdrop-blur-sm border border-white/70"
              title="Quick view"
            >
              <AiOutlineEye size={20} />
            </Link>
            <button
              onClick={() => addToCartHandler(p, 1)}
              className="p-3 rounded-full bg-gradient-to-r from-white/80 to-white/90 text-gray-800 hover:from-white hover:to-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 backdrop-blur-sm border border-white/70"
              title="Add to cart"
            >
              <AiOutlineShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="p-5 flex flex-col h-[160px] bg-gradient-to-br from-white/95 to-white/90">
        {/* Brand */}
        <div className="mb-1">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full inline-block shadow-sm transform transition-transform hover:scale-110 backdrop-blur-sm"
            style={{
              background: "linear-gradient(to right, #bfdbfe, #e9d5ff)",
              color: "#1e293b",
              textShadow: "0 1px 1px rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.5)"
            }}
          >
            {p?.brand}
          </span>
        </div>

        {/* Product name */}
        <Link to={`/product/${p._id}`} className="group-hover:text-blue-600 transition-colors">
          <h3 className="font-semibold text-gray-800 line-clamp-2 h-12 mb-1 transition-all duration-300 group-hover:text-indigo-700 group-hover:translate-x-0.5">{p?.name}</h3>
        </Link>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-2">{p?.description || "No description available"}</p>

        {/* Price and add to cart */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {p.originalPrice && p.originalPrice > p.price ? (
              <>
                <span className="text-gray-500 line-through text-sm">
                  {p.originalPrice?.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                </span>
                <span className="font-bold text-lg bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  {p?.price?.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                {p?.price?.toLocaleString("en-PK", {
                  style: "currency",
                  currency: "PKR",
                })}
              </span>
            )}
          </div>

          {/* Improved Add to Cart Button */}
          <button
            onClick={() => addToCartHandler(p, 1)}
            className={`flex items-center justify-center px-3 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg ${
              isAddingToCart ? "scale-95" : "hover:scale-105"
            } backdrop-blur-sm`}
            style={{
              background: "linear-gradient(to right, #bfdbfe, #e9d5ff)",
              color: "#1e293b",
              boxShadow: "0 4px 10px rgba(191, 219, 254, 0.4)",
              border: "1px solid rgba(255,255,255,0.6)",
              backdropFilter: "blur(4px)"
            }}
            disabled={isAddingToCart}
            aria-label="Add to cart"
          >
            <AiOutlineShoppingCart size={18} className="mr-1" />
            <span className="font-semibold text-sm">Add</span>
          </button>
        </div>
      </div>

      {/* View details button - appears at bottom on hover */}
      <div
        className={`absolute left-0 right-0 bottom-0 p-3 transition-all duration-300 ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        } backdrop-blur-md`}
        style={{
          background: "linear-gradient(to right, #bfdbfe, #e9d5ff)",
          boxShadow: "0 -4px 10px rgba(191, 219, 254, 0.2)"
        }}
      >
        <Link
          to={`/product/${p._id}`}
          className="block w-full text-center py-2.5 bg-white/30 backdrop-blur-sm rounded-lg text-gray-800 font-semibold hover:bg-white/50 transition-all duration-300 shadow-sm hover:shadow-md border border-white/40 hover:border-white/60"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
