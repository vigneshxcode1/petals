import React, { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../componets/Navbar/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";

const BASE_URL = "https://petals-backend-sec.onrender.com";

function GridExample() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     GET CATEGORY FROM URL
  ========================= */

  /* GET CATEGORY FROM URL */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    } else {
      setSelectedCategory("All");
    }
  }, [location.search]);

  /* FILTER PRODUCTS — Hair Care, Soap variants & Combos */
  const CATEGORY_MAP = {
    Haircare: ["shampoo", "aloe vera", "hair oil", "hair care"],
    Facewash: ["facewash", "face wash", "skin care", "skincare"],
    Soap: ["soap", "charcoal", "manjistha", "kuppaimeni"],
    "Charcoal Soap": ["charcoal"],
    "Manjistha Soap": ["manjistha"],
    "Kuppaimeni Soap": ["kuppaimeni"],
    "Double Soap Combo": ["combo", "duo", "double"],
    All: [],
  };

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
      return;
    }

    const mapped = CATEGORY_MAP[selectedCategory];

    if (mapped) {
      // match any of the mapped sub-categories
      setFilteredProducts(
        products.filter((item) =>
          mapped.some((cat) =>
            item.category?.toLowerCase().includes(cat)
          )
        )
      );
    } else {
      // fallback: exact match for any other category
      setFilteredProducts(
        products.filter(
          (item) =>
            item.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory, products]);
  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/products`
      );

      const sortedProducts =
        res.data.product.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

      setProducts(sortedProducts);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FILTER PRODUCTS
  ========================= */

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (item) =>
          item.category?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );

      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  /* =========================
     CATEGORY LIST
  ========================= */

  const categories = [
    "All",
    ...new Set(
      products.map((item) => item.category)
    ),
  ];

  if (loading)
    return (
      <p className="loading-text">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="error-text">{error}</p>
    );

  return (
    <>
      <Navbar />

      <section className="products-page">
        {/* HEADER */}

        <div className="products-header">
          <h1 className="products-title">
            Herbal Collections
          </h1>

          <p className="products-subtitle">
            Explore our premium herbal
            products
          </p>
        </div>

        {/* CATEGORY FILTER */}

        <div className="category-filter-wrapper">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-filter-btn ${selectedCategory === category
                ? "active-category"
                : ""
                }`}
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}

        <InfiniteScroll
          dataLength={filteredProducts.length}
          next={fetchProducts}
          hasMore={hasMore}
        >
          <div className="products-grid">
            {filteredProducts.map(
              (product, index) => (
                <div
                  className="product-card"
                  key={product._id}
                  style={{
                    "--delay": `${index * 0.05
                      }s`,
                  }}
                >
                  {/* IMAGE */}

                  <div
                    className="product-image-wrapper"
                    onClick={() =>
                      navigate(
                        `/products/${product._id}`
                      )
                    }
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>

                  {/* CONTENT */}

                  <div className="product-content">
                    <span className="product-category">
                      {product.category}
                    </span>

                    <h2 className="product-name">
                      {product.name}
                    </h2>
                    <div className="product-price-box">
                      <span className="product-cut-price">₹{product.cutprice}</span>
                      <span className="product-price">₹{product.price}</span>
                      {product.cutprice > product.price && (
                        <span className="product-discount">
                          {Math.round(((product.cutprice - product.price) / product.cutprice) * 100)}% off
                        </span>
                      )}
                    </div>

                    <button
                      className="view-product-btn"
                      onClick={() =>
                        navigate(
                          `/products/${product._id}`
                        )
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </InfiniteScroll>
      </section>
    </>
  );
}

export default GridExample;