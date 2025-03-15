import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3 bg-[#1a1a1c] rounded-lg shadow-lg">
          <div className="h-12 text-2xl font-bold text-white border-b border-gray-700 pb-4 mb-6">
            Create Product
          </div>

          {imageUrl && (
            <div className="text-center mb-6">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="product"
                className="block mx-auto max-h-[200px] rounded-lg border border-gray-700 p-2"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="border border-gray-600 text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 bg-[#101011] hover:bg-[#1e1e20] transition-colors duration-200 shadow-md">
              {image ? image.name : "Upload Product Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-4 bg-[#101011] rounded-lg shadow-md">
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex-1 min-w-[280px]">
                <label
                  htmlFor="name"
                  className="text-white text-sm font-medium block mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="p-4 mb-3 w-full border border-gray-700 rounded-lg bg-[#101011] text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product name"
                />
              </div>
              <div className="flex-1 min-w-[280px]">
                <label
                  htmlFor="price"
                  className="text-white text-sm font-medium block mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="p-4 mb-3 w-full border border-gray-700 rounded-lg bg-[#101011] text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Product price"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex-1 min-w-[280px]">
                <label
                  htmlFor="quantity"
                  className="text-white text-sm font-medium block mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="p-4 mb-3 w-full border border-gray-700 rounded-lg bg-[#101011] text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Product quantity"
                />
              </div>
              <div className="flex-1 min-w-[280px]">
                <label
                  htmlFor="brand"
                  className="text-white text-sm font-medium block mb-2"
                >
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  className="p-4 mb-3 w-full border border-gray-700 rounded-lg bg-[#101011] text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Product brand"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="text-white text-sm font-medium block mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className="p-4 mb-3 bg-[#101011] border border-gray-700 rounded-lg w-full text-white min-h-[120px] focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
              ></textarea>
            </div>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex-1 min-w-[280px]">
                <label
                  htmlFor="stock"
                  className="text-white text-sm font-medium block mb-2"
                >
                  Count In Stock
                </label>
                <input
                  type="text"
                  id="stock"
                  className="p-4 mb-3 w-full border border-gray-700 rounded-lg bg-[#101011] text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Stock count"
                />
              </div>

              <div className="flex-1 min-w-[280px]">
                <label
                  htmlFor="category"
                  className="text-white text-sm font-medium block mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="p-4 mb-3 w-full border border-gray-700 rounded-lg bg-[#101011] text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="" disabled selected>
                    Choose Category
                  </option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`py-4 px-10 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 text-white transition-colors duration-200 shadow-lg ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
