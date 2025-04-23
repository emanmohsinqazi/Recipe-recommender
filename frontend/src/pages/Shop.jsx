"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice"

import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice"
import Loader from "../components/Loader"
import ProductCard from "./Products/ProductCard"

const Shop = () => {
  const dispatch = useDispatch()
  const { categories, products, checked, radio } = useSelector((state) => state.shop)

  const categoriesQuery = useFetchCategoriesQuery()
  console.log(categoriesQuery)
  const [priceFilter, setPriceFilter] = useState("")

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  })

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data))
    }
  }, [categoriesQuery.data, dispatch])

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter((product) => {
          // Check if the product price includes the entered price filter value
          return product.price.toString().includes(priceFilter) || product.price === Number.parseInt(priceFilter, 10)
        })

        dispatch(setProducts(filteredProducts))
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter])

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter((product) => product.brand === brand)
    dispatch(setProducts(productsByBrand))
  }

  const handleCheck = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id)
    dispatch(setChecked(updatedChecked))
  }

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(filteredProductsQuery.data?.map((product) => product.brand).filter((brand) => brand !== undefined)),
    ),
  ]

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value)
  }

  return (
    <div style={{ background: "linear-gradient(to right, #bfdbfe, #e9d5ff)" }} className="min-h-screen py-8 bg-fixed">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="md:w-80 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/40 transition-transform duration-500 hover:shadow-2xl sticky top-4 self-start">
            <h2 className="text-lg font-bold text-center py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white mb-2 shadow-md">
              Filter by Categories
            </h2>

            <div className="p-5 w-full">
              {categories?.map((c) => (
                <div key={c._id} className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-5 h-5 text-purple-600 bg-white/70 border-2 border-purple-300 rounded focus:ring-purple-500 focus:ring-2 shadow-sm cursor-pointer"
                    />

                    <label htmlFor={`category-${c._id}`} className="ml-3 text-sm font-semibold text-gray-800 cursor-pointer hover:text-purple-800 transition-colors">
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold text-center py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white mb-2 shadow-md">
              Filter by Brands
            </h2>

            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <div key={brand} className="flex items-center mb-4">
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-5 h-5 text-purple-600 bg-white/70 border-2 border-purple-300 focus:ring-purple-500 focus:ring-2 shadow-sm cursor-pointer"
                  />

                  <label htmlFor={brand} className="ml-3 text-sm font-semibold text-gray-800 cursor-pointer hover:text-purple-800 transition-colors">
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold text-center py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white mb-2 shadow-md">
              Filter by Price
            </h2>

            <div className="p-5 w-full">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-4 py-3 placeholder-gray-500 bg-white/80 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-800 font-medium"
              />
            </div>

            <div className="px-5 pb-5">
              <button
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 hover:shadow-lg transition-all duration-300 shadow-md border border-white/20"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-5 mb-6 shadow-lg border border-white/30">
              <h2 className="text-xl font-bold text-center text-gray-800">{products?.length} Products</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length === 0 ? (
                <div className="col-span-full flex justify-center items-center h-64">
                  <Loader />
                </div>
              ) : (
                products?.map((p) => (
                  <div className="transform transition-transform duration-500 hover:scale-105" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
