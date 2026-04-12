// import React from "react";
// import "./Banner.css";

// const BannerPage = () => {
//   return (
//     <section className="hero">
//       {/* LEFT CONTENT */}
//       <div className="hero-left">
//         <p className="eyebrow">Limited Time Offer</p>
//         <p className="hero-brand">Muthu's Petals</p>

//         <h1 className="hero-h1">
//           <span className="flat">Flat</span>
//           <span className="num">15</span>
//           <span className="sym">%</span>
//           <span className="off">Off</span>
//         </h1>

//         <p className="hero-sub">
//           {/* <strong>+ Get your Freebie on orders above ₹549.</strong> */}
//           <br />
//           Shop Now &amp; Nourish Your Hair &amp; Skin Naturally with
//           toxin-free botanical ingredients.
//         </p>

//         <div className="hero-btns">
//           <a href="/products" className="btn-fill">View Products</a>
//           <a href="/ingredients" className="btn-outline">Our Ingredients</a>
//         </div>

//         <div className="trust-row">
//           <span className="trust-pill"><span className="dot"></span>Toxin Free (Naturally derived ingredients)</span>
//           <span className="trust-pill"><span className="dot"></span>Cruelty Free (Eco Conscious)</span>
//           <span className="trust-pill"><span className="dot"></span>Paraben or Sulfats free</span>
//           <span className="trust-pill"><span className="dot"></span>Dermatologist Tested</span>
//           <span className="trust-pill"><span className="dot"></span>Made With Love And Care</span>
//         </div>
//       </div>

//       {/* RIGHT — PRODUCT VISUAL */}
//       <div className="hero-right">
//         <div className="hero-mono">MP</div>
//         <div className="ring ring-1"></div>
//         <div className="ring ring-2"></div>
//         <div className="ring ring-3"></div>

//         {/* spinning offer badge */}
//         <div className="offer-badge">
//           <div className="offer-badge-inner">
//             <span className="big">15%</span>
//             <span className="sm">OFF</span>
//           </div>
//         </div>

//         {/* decorative product bottles */}
//         <div className="bottles">
//           <div className="bottle b1">
//             <span className="bottle-lbl">Anti Hair Fall Serum</span>
//             <span className="bottle-brand">Muthu's</span>
//           </div>
//           <div className="bottle b2">
//             <span className="bottle-lbl">Hair Oil</span>
//             <span className="bottle-brand">Muthu's</span>
//           </div>
//           <div className="bottle b3">
//             <span className="bottle-lbl">Anti Dandruff Shampoo</span>
//             <span className="bottle-brand">Muthu's</span>
//           </div>
//           <div className="bottle b4">
//             <span className="bottle-lbl">Conditioner</span>
//             <span className="bottle-brand">Muthu's</span>
//           </div>
//           <div className="bottle b5">
//             <span className="bottle-lbl">Scalp Tonic</span>
//             <span className="bottle-brand">Muthu's</span>
//           </div>
//           <div className="bottle b6">
//             <span className="bottle-lbl">Hair Mask</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BannerPage;


import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

/* ── swap these imports for your real images ── */
import heroImg from "../../../assets/hero-products.jpg";
import hairImg from "../../../assets/product-branding-packaging.jpg";
import skinImg from "../../../assets/beach-skincare-product-still-life.jpg";
import bestImg from "../../../assets/serum-bottle-flower-arrangement.jpg";

const TRUST_PILLS = [
  "Toxin Free",
  "Cruelty Free",
  "Paraben & Sulfate Free",
  "Dermatologist Tested",
];

const CATEGORIES = [
  { label: "Hair Care", img: hairImg, href: "/products?category=haircare" },
  { label: "Skin Care", img: skinImg, href: "/products?category=skincare" },
  { label: "Best Sellers", img: bestImg, href: "/products?sort=bestseller" },
];

export default function Banner() {
  return (
    <div className="banner-root">

      {/* ═══════════ HERO ═══════════ */}
      <section className="bn-hero">

        {/* decorative blobs */}
        <span className="bn-blob bn-blob--left" aria-hidden="true" />
        <span className="bn-blob bn-blob--right" aria-hidden="true" />

        {/* LEFT */}
        <div className="bn-left">
          <p className="bn-eyebrow">Natural Skincare &amp; Haircare</p>

          <h1 className="bn-h1">
            Muthu's Petals.<br />
            <span className="bn-h1-em">Nature’s Care for You.</span>
          </h1>

          <p className="bn-sub">
            At Muthus Petals, we believe in simple, honest beauty.
            Experience gentle, toxin-free skincare and haircare crafted
            from nature to nourish your skin, strengthen your hair,
            and bring out your natural glow.
          </p>

          <div className="bn-btns">
            <Link to="/products" className="bn-btn-fill">Shop Now</Link>
            <Link to="/ingredients" className="bn-btn-outline">Know Our Ingredients</Link>
          </div>

          <div className="bn-trust">
            {TRUST_PILLS.map((p) => (
              <span key={p} className="bn-trust-pill">
                <span className="bn-dot" />
                {p}
              </span>
            ))}
          </div>
        </div>
        {/* RIGHT — replace src with your hero product image */}


      </section>

      {/* ═══════════ CATEGORY CARDS ═══════════ */}
      <section className="bn-cats">
        {CATEGORIES.map(({ label, img, href }) => (
          <Link key={label} to={href} className="bn-cat-card">
            <div className="bn-cat-img-wrap">
              <img src={img} alt={label} className="bn-cat-img" />
            </div>
            <p className="bn-cat-label">{label}</p>
          </Link>
        ))}
      </section>

    </div>
  );
}