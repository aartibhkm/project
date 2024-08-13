import React from "react";
import { useState, useEffect } from "react";
const Index = ({ products, onSortedProducts }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      switch (sortOrder) {
        case "asc":
          return a.price - b.price;
        case "desc":
          return b.price - a.price;
        case "id":
          return a.id - b.id;
        default:
          return 0;
      }
    });
    onSortedProducts(sortedProducts);
  }, [sortOrder, products, onSortedProducts]);

  return (
    <div className="filter-container">
      <label htmlFor="price-filter">Sort by:</label>
      <select id="price-filter" value={sortOrder} onChange={handleSortChange}>
        <option value="id">None</option>
        <option value="desc">High to Low</option>
        <option value="asc">Low to High</option>
      </select>
    </div>
  );
};

export default Index;
