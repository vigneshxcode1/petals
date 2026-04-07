import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Trendingshirt.css";

const BASE_URL = "https://muthushop.onrender.com";
// const BASE_URL = "http://localhost:8000";

const Trendingshirt = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const trackRef = useRef(null);

  /* ── Drag-to-scroll ── */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let isDown = false, startX, scrollLeft;

    const down  = (e) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const leave = ()  => { isDown = false; };
    const up    = ()  => { isDown = false; };
    const move  = (e) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
    };

    el.addEventListener("mousedown", down);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("mouseup", up);
    el.addEventListener("mousemove", move);
    return () => {
      el.removeEventListener("mousedown", down);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("mouseup", up);
      el.removeEventListener("mousemove", move);
    };
  }, [products]);

  /* ── Fetch products ── */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cached = localStorage.getItem("Shampoo");
        if (cached) {
          setProducts(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/v1/products?category=Shampoo`);
        const sorted = res.data.product.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const first15 = sorted.slice(0, 15);
        localStorage.setItem("Shampoo", JSON.stringify(first15));
        setProducts(first15);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return (
    <div className="ts-section">
      <div className="ts-loading">
        <div className="ts-spinner" />
        <p className="ts-loading-text">Curating collection…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="ts-section">
      <div className="ts-loading">
        <p className="ts-loading-text">{error}</p>
      </div>
    </div>
  );

  return (
    <section className="ts-section">

      <div className="ts-header-block">
        <div>
          <p className="ts-eyebrow">Best Sellers</p>
          <h2 className="ts-title">
            Natural <em>Shampoo</em> <em> Collection</em>
          </h2>
        </div>
        <Link className="ts-see-all" to="/products">View all →</Link>
      </div>

      <div className="ts-track-wrapper">
        <div className="ts-track" ref={trackRef}>
          {products.map((product) => (
            <div
              className="ts-card"
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <div className="ts-img-wrap">
                {product.images?.length > 0 ? (
                  <img
                    className="ts-img"
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                  />
                ) : (
                  <div style={{ height: "100%", background: "#ede8e1" }} />
                )}
              </div>

              <div className="ts-card-body">
                <p className="ts-name">{product.name}</p>
                <div className="ts-pricing">
                  <span className="ts-price-cut">₹{product.cutprice}</span>
                  <span className="ts-price-org">₹{product.price}</span>
                </div>
                <button
                  className="ts-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products/${product._id}`);
                  }}
                >
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ts-scroll-hint">
        <div className="ts-dot active" />
        <div className="ts-dot" />
        <div className="ts-dot" />
      </div>

    </section>
  );
};

export default Trendingshirt;