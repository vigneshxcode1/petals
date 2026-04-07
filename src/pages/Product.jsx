import React, { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../componets/Navbar/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";

const BASE_URL = "https://muthushop.onrender.com";

function GridExample() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/products`);
      const sorted = res.data.product.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProducts(sorted);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />

      <section className="product-section">
        <h1 className="grid-title">Herbal Collections</h1>

        <InfiniteScroll
          dataLength={products.length}
          next={fetchProducts}
          hasMore={hasMore}
        >
          <div className="product-grid">
            {products.map((product, i) => (
              <div
                className="product-card"
                key={product._id}
                style={{ "--delay": `${i * 0.05}s` }}
              >
                <div
                  className="img-wrap"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                  />
                </div>

                <div className="product-info">
                  <p className="name">{product.name}</p>

                  <div className="price-box">
                    <span className="cut">₹{product.cutprice}</span>
                    <span className="price">₹{product.price}</span>
                  </div>

                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="btn"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </section>
    </>
  );
}

export default GridExample;