import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../componets/Navbar/Navbar";
import "./Gallery.css"; // Reuse or extend gallery styles

const BASE_URL = "https://petals-backend-sec.onrender.com";

const Creategallery = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image file to upload.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("tokens");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        toast.success("Image successfully added to Customer Gallery!");
        navigate("/gallery");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.error || "Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="gallery-container">
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '24px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <Link to="/dashbroad" className="btn btn-outline-secondary btn-sm mb-3">
            ← Back to Dashboard
          </Link>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, marginBottom: '20px', color: '#1a1a2e' }}>Add to Customer Gallery</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label" style={{ fontWeight: 600, color: '#4a5568' }}>Select Customer Photo</label>
              <input
                type="file"
                accept="image/*"
                required
                className="form-control"
                onChange={handleFileChange}
              />
              <small className="form-text text-muted">Upload high-quality JPEG or PNG customer photo.</small>
            </div>

            {preview && (
              <div className="mb-4 text-center">
                <p style={{ fontWeight: 600, color: '#4a5568', textAlign: 'left' }}>Preview:</p>
                <img
                  src={preview}
                  alt="Upload preview"
                  style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', border: '1px solid #e2e8f0', objectFit: 'contain' }}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
              style={{ padding: '12px', fontSize: '1rem', fontWeight: 600, borderRadius: '8px', transition: 'all 0.2s' }}
            >
              {loading ? "Uploading to Cloudflare R2..." : "Upload Image"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Creategallery;