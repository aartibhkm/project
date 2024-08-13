// src/ProductCard.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Index({ product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={hovered ? product.images[1] : product.images[0]}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹{product.price.toLocaleString()}</p>
      <Link to={`/paints/${product.id}`} className="view-details-link">View Details</Link>
    </div>
  );
}

export default Index;
