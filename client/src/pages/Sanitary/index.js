// src/HomePage.js

import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "../../components/Cards/ProductCard";
import "../../styles/Sanitary.css";
import SortByPrice from "../../components/Filters/SortByPrice";
import apiHelper from "../../utils/apiHelper";
import CircularLoader from "../../components/Loaders/CircularLoader";
function Index() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await apiHelper("/product", {
          category: "Sanitary"
        }, "GET");
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
    <div className="home-container">
      {loading && <CircularLoader />}
      <img
        src={"/images/banner/sanitary/Sanitary.jpg"}
        alt="Banner"
        className="banner-image"
      />
      <SortByPrice
        products={products}
        onSortedProducts={handleSortedProducts}
      />
      <div className="product-grid">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product._id}
            category={"Sanitary"}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Index;
