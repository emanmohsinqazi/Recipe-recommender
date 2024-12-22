import Layout from "../../components/components/layout/Layout"
import Banner from "../../components/components/banner/Banner";
import Categories from "../../components/components/Categories";
import Products from "../../components/components/Products";
import DeliveryBanner from "../../components/components/DeliveryBanner";
import { CartProvider } from "../../context/CartContext";
import { ProductProvider } from "../../context/ProductContext";

const Shop = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <Layout>
          <Banner />
          <Categories />
          <Products />
          <DeliveryBanner />
        </Layout>
      </CartProvider>
    </ProductProvider>
  );
};

export default Shop;
