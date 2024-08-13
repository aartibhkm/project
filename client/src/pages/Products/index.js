// src/ProductDetailPage.js
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../reducers/cartSlice"; // Adjust the path as necessary
import "../../styles/Product.css";
import apiHelper from "../../utils/apiHelper";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function Index() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const id = query.get("id");
  useEffect(() => {
    setLoading(true);
    try {
      const fetchProduct = async () => {
        const response = await apiHelper(
          `/product`,
          {
            id: id,
          },
          "GET"
        );
        const { data } = await response;
        setProduct(data.product);
      };
      fetchProduct();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  if (!product) return <div>Product not found</div>;

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.imageUrl.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.imageUrl.length) % product.imageUrl.length
    );
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product._id,
        name: product.name,
        imageUrl: product.imageUrl[0],
        description: product.description,
        price: product.price,
        quantity: 1,
      })
    );
    navigate("/cart"); // Redirect to /cart page
  };

  return (
    <>
      <div className="product-detail">
        <div className="slideshow">
          <button className="nav-button prev" onClick={prevImage}>
            ❮
          </button>
          <img
            src={product.imageUrl[currentImageIndex]}
            alt={product.name}
            className="product-detail-image"
          />
          <button className="nav-button next" onClick={nextImage}>
            ❯
          </button>
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">
            ₹{product.price.toLocaleString()}
          </p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;
