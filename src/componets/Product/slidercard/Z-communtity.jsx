import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./zculture.css";

const BASE_URL = "https://petals-backend-p9st.onrender.com";


const MOCK_PRODUCTS = [
  {
    _id: "1",
    name: "Herbal Anti-Hairfall Shampoo",
    price: 299,
    cutprice: 499,
    createdAt: "2026-04-01",
    images: ["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTTb178YRVcp2npaheFEOCj2gztYa2wSa3a_xvK49EJh-GEKUbA5DuLiXSf15AlElBbZm57zGcv-Ak82BPIzltRyH5J3asOfIjkFSwnSbSuyiAlGLd7laUj"]
  },
  {
    _id: "2",
    name: "Aloe Vera Hydrating Shampoo",
    price: 349,
    cutprice: 549,
    createdAt: "2026-04-02",
    images: ["https://m.media-amazon.com/images/I/41SM0B55aOL._SY355_.jpg"]
  },
  {
    _id: "3",
    name: "Onion Hair Growth Shampoo",
    price: 399,
    cutprice: 599,
    createdAt: "2026-04-03",
    images: ["https://m.media-amazon.com/images/I/41MjAs7mMiL._SY300_SX300_QL70_FMwebp_.jpg"]
  },
  {
    _id: "4",
    name: "Keratin Smooth Repair Shampoo",
    price: 459,
    cutprice: 699,
    createdAt: "2026-04-04",
    images: ["https://i.ibb.co/k2pb50KC/beach-skincare-product-still-life.jpg"]
  },
  {
    _id: "5",
    name: "Tea Tree Dandruff Control Shampoo",
    price: 279,
    cutprice: 449,
    createdAt: "2026-04-05",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6_TPLlzDn-9Vx_DL_AZVVsbGflaEpoeT5Q&s"]
  }
];


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

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const res = await axios.get(`${BASE_URL}/api/v1/products`);
  //       const sorted = res.data.product.sort(
  //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //       );
  //       const first15 = sorted.slice(0, 15);
  //       localStorage.setItem("zculture", JSON.stringify(first15));
  //       setProducts(first15);
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //       setError("Connection issue. Please check your internet and try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);


  useEffect(() => {
    setLoading(true);
    setError(null);

    const sorted = [...MOCK_PRODUCTS].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setTimeout(() => {
      setProducts(sorted);
      setLoading(false);
    }, 800); // keeps skeleton animation
  }, []);


  return (
    <section className="zculture">
      <div className="zculture__header">
        <h2 className="zculture__title">Best Seller</h2>
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