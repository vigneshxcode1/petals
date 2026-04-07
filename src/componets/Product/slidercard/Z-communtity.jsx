import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./zculture.css";

const BASE_URL = "https://muthushop.onrender.com";

const SkeletonCard = () => (
  <div className="product-card skeleton-card">
    <div className="skeleton skeleton-img" />
    <div className="skeleton skeleton-title" />
    <div className="skeleton skeleton-price" />
    <div className="skeleton skeleton-btn" />
  </div>
);

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("card--visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
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
      ref={cardRef}
      style={{ "--card-delay": `${(index % 5) * 0.08}s` }}
    >
      <div
        className="product-card__img-wrap"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-card__img"
            loading="lazy"
          />
        ) : (
          <div className="product-card__no-img">No Image</div>
        )}
        {discount > 0 && (
          <span className="product-card__badge">{discount}% OFF</span>
        )}
        <div className="product-card__overlay">
          <button
            className="product-card__quick-view"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="product-card__info">
        <p className="product-card__name">{product.name}</p>
        <div className="product-card__pricing">
          {product.cutprice && (
            <span className="product-card__cut">₹{product.cutprice}</span>
          )}
          <span className="product-card__price">₹{product.price}</span>
        </div>
        <button
          className="product-card__btn"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const Trendingshirt = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/products`);
        const sorted = res.data.product.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const first15 = sorted.slice(0, 15);
        localStorage.setItem("zculture", JSON.stringify(first15));
        setProducts(first15);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Connection issue. Please check your internet and try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="zculture">
      <div className="zculture__header">
        <h2 className="zculture__title">New Arrivals</h2>
        <p className="zculture__subtitle">Fresh styles, just dropped</p>
      </div>

      {error && (
        <div className="zculture__error">
          <span>⚠</span> {error}
        </div>
      )}

      <div className="zculture__grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
      </div>
    </section>
  );
};

export default Trendingshirt;