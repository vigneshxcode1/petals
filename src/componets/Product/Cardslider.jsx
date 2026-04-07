import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CardSlider.css";

const BASE_URL = "https://muthushop.onrender.com";

/* Skeleton Loader */
const SkeletonCard = () => (
  <div className="product-card skeleton-card">
    <div className="skeleton skeleton-img" />
    <div className="skeleton skeleton-title" />
    <div className="skeleton skeleton-price" />
    <div className="skeleton skeleton-btn" />
  </div>
);

/* Product Card */
const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("show");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const discount =
    product.cutprice && product.price
      ? Math.round(
          ((product.cutprice - product.price) / product.cutprice) * 100
        )
      : null;

  return (
    <div
      className="product-card"
      ref={ref}
      style={{ "--delay": `${index * 0.05}s` }}
    >
      <div
        className="img-box"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        {product.images?.length ? (
          <img src={product.images[0]} alt={product.name} />
        ) : (
          <div className="no-img">No Image</div>
        )}

        {discount > 0 && <span className="badge">{discount}% OFF</span>}

        <div className="overlay">
          <button onClick={() => navigate(`/products/${product._id}`)}>
            Quick View
          </button>
        </div>
      </div>

      <div className="info">
        <p className="name">{product.name}</p>

        <div className="price-box">
          {product.cutprice && (
            <span className="cut">₹{product.cutprice}</span>
          )}
          <span className="price">₹{product.price}</span>
        </div>

        <button
          className="btn"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

/* Main Component */
const Trendingshirt = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/products`);
        const sorted = res.data.product.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sorted.slice(0, 15));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <section className="products-section">
      <h2 className="title">New Arrivals</h2>
      <p className="subtitle">Latest natural products for you</p>

      <div className="grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : products.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
      </div>
    </section>
  );
};

export default Trendingshirt;