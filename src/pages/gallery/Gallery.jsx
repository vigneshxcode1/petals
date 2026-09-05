import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../componets/Navbar/Navbar";
import "./Gallery.css";

const BASE_URL = "https://petals-backend-sec.onrender.com";

/* ── Lightbox ── */
const Lightbox = ({ src, onClose }) => (
  <div className="gl-overlay" onClick={onClose}>
    <div className="gl-lightbox" onClick={(e) => e.stopPropagation()}>
      <button className="gl-close" onClick={onClose} aria-label="Close">&#x2715;</button>
      <img src={src} alt="Gallery full view" className="gl-lb-img" />
    </div>
  </div>
);

/* ── Skeleton card ── */
const SkeletonCard = () => <div className="gallery-item gallery-skeleton" />;

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/gallery`);
        // response.data is an array of { _id, publicUrl, createdAt }
        // already sorted newest-first by the backend
        setGalleryImages(response.data);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
        setError("Could not load gallery. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <>
      <Navbar />
      <div className="gallery-container">
        <h1 className="gallery-title">Customer Gallery</h1>
        <h2 className="upload-txt">
          Rock the Look, Snap a Pic!<br />
          Share your style with <strong>@muthupetals</strong> and get featured
        </h2>

        {/* Loading skeletons */}
        {loading && (
          <div className="gallery-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="gallery-error">
            <span>😔</span>
            <p>{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && galleryImages.length === 0 && (
          <div className="gallery-empty">
            <span>📸</span>
            <p>No photos yet. Be the first to share your look!</p>
          </div>
        )}

        {/* Image grid */}
        {!loading && !error && galleryImages.length > 0 && (
          <div className="gallery-grid">
            {galleryImages.map((item, index) => (
              <div
                className="gallery-item"
                key={item._id || index}
                onClick={() => setSelected(item.publicUrl)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={item.publicUrl}
                  alt={`Customer photo ${index + 1}`}
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="gallery-zoom-icon">🔍</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && <Lightbox src={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default Gallery;
