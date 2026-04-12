import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CardSlider.css";

const BASE_URL = "https://petals-backend-p9st.onrender.com";


const MOCK_PRODUCTS = [
  {
    _id: "p1",
    name: "Classic White Oversized T-Shirt",
    price: 799,
    cutprice: 1199,
    createdAt: "2026-04-01",
    images: ["https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQBzy1Q9TxJ7et4ksLNXNfcVdfAvXEciTeMU0R4WVEDghPAbcaV4EMpVN7DtjkKzcahxx9SzNzJmGxsmO_caspLP98ziZ70Sc8k7lFg2Ze68Pw5k9mH7Czyfg"]
  },
  {
    _id: "p2",
    name: "Black Streetwear Graphic Tee",
    price: 899,
    cutprice: 1399,
    createdAt: "2026-04-02",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR60zUZD_MLN22QG_vlfH1DpUWhPIm4sqKbOQ&s"]
  },
  {
    _id: "p3",
    name: "Minimal Beige Cotton T-Shirt",
    price: 699,
    cutprice: 999,
    createdAt: "2026-04-03",
    images: ["https://i.ibb.co/kVRL2WVL/serum-bottle-flower-arrangement.jpg"]
  },
  {
    _id: "p4",
    name: "Vintage Washed Black Tee",
    price: 999,
    cutprice: 1499,
    createdAt: "2026-04-04",
    images: ["https://www.vilvahstore.com/cdn/shop/files/Firstcard_1.jpg?v=1769172467&width=700"]
  },
  {
    _id: "p5",
    name: "Urban Printed Drop-Shoulder Tee",
    price: 849,
    cutprice: 1299,
    createdAt: "2026-04-05",
    images: ["https://i.ibb.co/kVRL2WVL/serum-bottle-flower-arrangement.jpg"]
  },
  {
    _id: "p6",
    name: "Pastel Blue Relaxed Fit T-Shirt",
    price: 749,
    cutprice: 1099,
    createdAt: "2026-04-06",
 images: ["https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQBzy1Q9TxJ7et4ksLNXNfcVdfAvXEciTeMU0R4WVEDghPAbcaV4EMpVN7DtjkKzcahxx9SzNzJmGxsmO_caspLP98ziZ70Sc8k7lFg2Ze68Pw5k9mH7Czyfg"]  }
];

const BADGES = ["BEST SELLER", "TRENDING", "NEW ARRIVAL", "HOT PICK", "TOP RATED"];

const StarRating = ({ rating = 4.5, count = 0 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= Math.floor(rating);
    const half = !filled && i < rating;
    return { filled, half };
  });

  return (
    <div className="star-row">
      <span className="stars">
        {stars.map((s, i) => (
          <span key={i} className={`star ${s.filled ? "filled" : s.half ? "half" : "empty"}`}>
            ★
          </span>
        ))}
      </span>
      <span className="review-count">{rating.toFixed(2)} | {count} reviews</span>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="product-card skeleton-card">
    <div className="skeleton skeleton-img" />
    <div className="card-body">
      <div className="skeleton skeleton-line long" />
      <div className="skeleton skeleton-line medium" />
      <div className="skeleton skeleton-line short" />
    </div>
  </div>
);

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("show"), index * 60);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [index]);



  const discount =
    product.cutprice && product.price
      ? Math.round(((product.cutprice - product.price) / product.cutprice) * 100)
      : null;

  const badge = BADGES[index % BADGES.length];
  const fakeRating = parseFloat((4.5 + Math.random() * 0.49).toFixed(2));
  const fakeCount = Math.floor(Math.random() * 1500) + 100;

  return (
    <div
      className="product-card"
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <div className="img-wrapper">
        {product.images?.length ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className={`card-img ${hovered ? "zoomed" : ""}`}
          />
        ) : (
          <div className="no-img">No Image</div>
        )}

        <span className="badge-label">{badge}</span>

        {discount > 0 && (
          <span className="discount-bubble">{discount}% OFF</span>
        )}

        <div className={`quick-view-bar ${hovered ? "visible" : ""}`}>
          <span>Quick View</span>
        </div>
      </div>

      <div className="card-body">
        <p className="product-name">{product.name}</p>

        <StarRating rating={fakeRating} count={fakeCount} />

        <div className="price-row">
          <span className="mrp-label">MRP:</span>
          {product.cutprice && (
            <span className="original-price">₹{product.cutprice}</span>
          )}
          <span className="sale-price">₹{product.price}</span>
          {discount > 0 && (
            <span className="off-pill">{discount}% OFF</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Trendingshirt = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Hair", "Skin", "Body"];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`${BASE_URL}/api/v1/products?category=Shampoo`);
  //       const sorted = res.data.product.sort(
  //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //       );
  //       setProducts(sorted.slice(0, 16));
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);


  useEffect(() => {
    setLoading(true);

    const sorted = [...MOCK_PRODUCTS].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setTimeout(() => {
      setProducts(sorted);
      setLoading(false); // ✅ IMPORTANT
    }, 800);
  }, []);

  return (
    <section className="products-section">
      <div className="section-header">
        <h2 className="section-title">New Arrivals</h2>
        <p className="section-sub">Latest natural products, curated for you</p>


      </div>

      <div className="product-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((p, i) => (
            <ProductCard key={p._id} product={p} index={i} />
          ))}
      </div>
    </section>
  );
};

export default Trendingshirt;