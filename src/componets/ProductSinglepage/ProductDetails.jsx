import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./productDetails.css";

import loadingimg from "../../componets/images/7LXw.gif";
import Navbar from "../Navbar/Navbar.jsx";
import { addCartItem } from "../../localStorageHelpers.jsx";
import Bestseller from "../../componets/Product/slidercard/Bestseller.jsx";

const BASE_URL = "https://petals-backend-p9st.onrender.com";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("100");
  const [current, setCurrent] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [openAccord, setOpenAccord] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/products/${id}`);
        setProduct(data.product);
      } catch (err) {
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(prev + change, 1));
  };

  const handleAddToCart = async () => {
    try {
      const updatedStock = product.stock - quantity;
      if (updatedStock < 0) {
        toast.error("Not enough stock available.");
        return;
      }
      addCartItem({ ...product, size: selectedSize }, quantity);
      setProduct((prev) => ({ ...prev, stock: updatedStock }));
      toast.success("Added to cart!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      toast.error("Failed to add product to cart. Please try again.");
    }
  };

  const nextSlide = () => {
    setImgLoaded(false);
    setCurrent((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setImgLoaded(false);
    setCurrent((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setImgLoaded(false);
    setCurrent(index);
  };

  const toggleAccord = (key) => {
    setOpenAccord((prev) => (prev === key ? null : key));
  };

  const accordions = [
    {
      key: "desc",
      title: "Description",
      content: (
        <ul className="accord-list">
          {product?.describe
            ? product.describe.split("\n").map((line, i) => <li key={i}>{line}</li>)
            : <li>Premium quality product. Detailed description coming soon.</li>}
        </ul>
      ),
    },
    {
      key: "payment",
      title: "Payment Policy",
      content: (
        <ul className="accord-list">
          <li>Payment scanner or UPI ID will be sent to your WhatsApp after ordering.</li>
          <li>Share payment screenshot to confirm — your order processes automatically.</li>
          <li>Failed transactions are refunded within 3–4 business days.</li>
        </ul>
      ),
    },
    {
      key: "shipping",
      title: "Shipping Info",
      content: (
        <ul className="accord-list">
          <li>Orders processed within 1–3 business days.</li>
          <li>Tracking info sent via SMS / WhatsApp once dispatched.</li>
          <li>Delivery within 3–4 business days via courier partners.</li>
          <li>Customers are responsible for accurate shipping information.</li>
          <li>Shipping costs calculated by destination and package weight.</li>
        </ul>
      ),
    },
    {
      key: "returns",
      title: "Returns & Refunds",
      content: (
        <ul className="accord-list">
          <li>Returns accepted only for quality or manufacturing defects.</li>
          <li>Notify us within 1 day of receiving your order.</li>
          <li>No returns or refunds for size or preference issues.</li>
        </ul>
      ),
    },
  ];

  if (loading)
    return (
      <div className="pd-loading">
        <img src={loadingimg} alt="Loading..." className="pd-loading-img" />
        <p className="pd-loading-text">Loading product...</p>
      </div>
    );

  if (error) return <div className="pd-error">{error}</div>;
  if (!product) return <div className="pd-error">No product details available.</div>;

  const discount =
    product.cutprice && product.price
      ? Math.round(((product.cutprice - product.price) / product.cutprice) * 100)
      : null;

  return (
    <>
      <Navbar />
      <div className="pd-page">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <Link to="/">Home</Link>
          <span className="pd-bc-sep">›</span>
          <Link to="/products">Products</Link>
          <span className="pd-bc-sep">›</span>
          <span className="pd-bc-current">{product.name}</span>
        </nav>

        <div className="pd-card">
          <div className="pd-grid">
            {/* ── Gallery ── */}
            <div className="pd-gallery">
              {/* {discount && <span className="pd-badge pd-badge-sale">{discount}% OFF</span>}
              <span className="pd-badge pd-badge-new">Bestseller</span> */}

              <button className="pd-nav pd-nav-prev" onClick={prevSlide} aria-label="Previous">
                &#8249;
              </button>
              <button className="pd-nav pd-nav-next" onClick={nextSlide} aria-label="Next">
                &#8250;
              </button>

              <div className="pd-main-wrap">
                {product.images && product.images.length > 0 ? (
                  <img
                    key={current}
                    className={`pd-main-img ${imgLoaded ? "pd-img-visible" : ""}`}
                    src={product.images[current]}
                    alt={`${product.name} - image ${current + 1}`}
                    onLoad={() => setImgLoaded(true)}
                  />
                ) : (
                  <div className="pd-no-img">No image</div>
                )}
              </div>

              {/* Dots */}
              {product.images && product.images.length > 1 && (
                <div className="pd-dots">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      className={`pd-dot ${i === current ? "pd-dot-active" : ""}`}
                      onClick={() => goToSlide(i)}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="pd-thumbs">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      className={`pd-thumb ${i === current ? "pd-thumb-active" : ""}`}
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      onClick={() => goToSlide(i)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── Info ── */}
            <div className="pd-info">
              {product.category && (
                <span className="pd-category-tag">{product.category}</span>
              )}

              <h1 className="pd-name">{product.name}</h1>

              {/* {product.color && (
                <p className="pd-color">• {product.color}</p>
              )} */}

              {/* Prices */}
              <div className="pd-price-row">
                <span className="pd-price-now">₹{product.price}</span>
                {product.cutprice && (
                  <span className="pd-price-was">₹{product.cutprice}</span>
                )}
                {discount && (
                  <span className="pd-discount-pill">{discount}% off</span>
                )}
              </div>

              <p className="pd-free-ship">✓ Free shipping on prepaid orders</p>

              {/* Stock bar */}
              {product.stock <= 20 && (
                <div className="pd-stock-bar">
                  <p className="pd-stock-label">Only {product.stock} units left — selling fast</p>
                  <div className="pd-stock-track">
                    <div
                      className="pd-stock-fill"
                      style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Size */}
              <div className="pd-section">
                <p className="pd-section-label">Select ml</p>
                <div className="pd-size-row">
                  {["200",  "500"].map((s) => (
                    <button
                      key={s}
                      className={`pd-size-btn ${selectedSize === s ? "pd-size-active" : ""}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s} ml
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="pd-section">
                <p className="pd-section-label">Quantity</p>
                <div className="pd-qty-row">
                  <button
                    className="pd-qty-btn"
                    onClick={() => handleQuantityChange(-1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="pd-qty-val">{quantity}</span>
                  <button
                    className="pd-qty-btn"
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="pd-cta-row">
                <button className="pd-btn-cart" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button
                  className={`pd-btn-wish ${wishlist ? "pd-wish-active" : ""}`}
                  onClick={() => setWishlist((w) => !w)}
                  aria-label="Add to wishlist"
                >
                  {wishlist ? "♥" : "♡"}
                </button>
              </div>

              {/* Trust badges */}
              <div className="pd-trust-row">
                <div className="pd-trust-item">
                  <span className="pd-trust-icon">⚡</span>
                  <span>2–5 day dispatch</span>
                </div>
                <div className="pd-trust-item">
                  <span className="pd-trust-icon">↩</span>
                  <span>Easy returns</span>
                </div>
                <div className="pd-trust-item">
                  <span className="pd-trust-icon">🔒</span>
                  <span>Secure payment</span>
                </div>
              </div>

              {/* Accordions */}
              <div className="pd-accord">
                {accordions.map(({ key, title, content }) => (
                  <div key={key} className="pd-accord-item">
                    <button
                      className="pd-accord-hdr"
                      onClick={() => toggleAccord(key)}
                      aria-expanded={openAccord === key}
                    >
                      {title}
                      <span
                        className="pd-accord-arrow"
                        style={{ transform: openAccord === key ? "rotate(180deg)" : "rotate(0)" }}
                      >
                        ▼
                      </span>
                    </button>
                    <div className={`pd-accord-body ${openAccord === key ? "pd-accord-open" : ""}`}>
                      <div className="pd-accord-inner">{content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bestseller />
    </>
  );
};

export default ProductDetail;