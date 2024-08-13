// src/ProductCard.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Index({ product, category }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="product-card "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={
          hovered
            ? product.imageUrl[1]
              ? product.imageUrl[1]
              : product.imageUrl[0]
            : product.imageUrl[0]
        }
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">
        {product.name.length > 50
          ? product.name.substr(0, 50) + "..."
          : product.name}
      </h3>
      <p className="product-price">₹{product.price.toLocaleString()}</p>
      <Link
        to={`/product/${category}?id=${product._id}`}
        className="view-details-link"
      >
        View Details
      </Link>
    </div>
  );
}

export default Index;
