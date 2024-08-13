import React, { useState, useEffect, useCallback } from "react";
import { products as initialProducts } from "../../data/paints";
import ProductCard from "../../components/Cards/ProductCard";
import SortByPrice from "../../components/Filters/SortByPrice";
import apiHelper from "../../utils/apiHelper";
import "./../../styles/Paints.css";
import CircularLoader from "../../components/Loaders/CircularLoader";
function Index() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await apiHelper(
          "/product",
          {
            category: "Hardware",
          },
          "GET"
        );
        const { data } = response;
        setProducts(data.products);
        setSortedProducts(data.products); // Initialize sortedProducts with fetched products
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty array ensures it runs only once

  const handleSortedProducts = useCallback((sortedProducts) => {
    setSortedProducts(sortedProducts);
  }, []);

  return (
    <div className="home-container relative">
      {loading && <CircularLoader />}
      <img
        src={"/images/banner/hardware/main-banner.jpg"}
        alt="Banner"
        className="banner-image"
      />
      <SortByPrice
        products={products}
        onSortedProducts={handleSortedProducts}
      />

      <div className="product-grid">
        {sortedProducts.map((product) => {
          return (
            <ProductCard
              key={product._id}
              category={"Hardware"}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Index;
