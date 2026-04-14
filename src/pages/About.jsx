import React, { useEffect, useRef } from "react";
import './about.css';

const About = () => {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("about--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elementsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" ref={sectionRef}>
      {/* Decorative petals */}
      <span className="petal petal--1" aria-hidden="true">✿</span>
      <span className="petal petal--2" aria-hidden="true">❀</span>
      <span className="petal petal--3" aria-hidden="true">✾</span>
      <span className="petal petal--4" aria-hidden="true">✿</span>

      <div className="about__inner">
        <div
          className="about__tag fade-up"
          ref={(el) => (elementsRef.current[0] = el)}
          style={{ "--delay": "0s" }}
        >
          Our Story
        </div>

        <h1
          className="about__heading fade-up"
          ref={(el) => (elementsRef.current[1] = el)}
          style={{ "--delay": "0.12s" }}
        >
          Welcome to <em>Muthus Petals</em>
        </h1>

        <div
          className="about__divider fade-up"
          ref={(el) => (elementsRef.current[2] = el)}
          style={{ "--delay": "0.2s" }}
        >
          <span /><span /><span />
        </div>

        <p
          className="about__text fade-up"
          ref={(el) => (elementsRef.current[3] = el)}
          style={{ "--delay": "0.28s" }}
        >
          Where <strong>nature meets beauty.</strong> Our range of natural shampoo, soap, and
          cosmetic products are crafted with love and care, using only the finest
          ingredients to nourish your skin and hair.
        </p>

        <p
          className="about__text fade-up"
          ref={(el) => (elementsRef.current[4] = el)}
          style={{ "--delay": "0.36s" }}
        >
          At Muthus Petals, we infuse nature's essence into our cosmetics, crafting
          gentle, effective formulas that bloom with every use. Let the soft touch of
          petals soothe your skin, and the sweet scent of nature uplift your senses.
        </p>

        <div
          className="about__pills fade-up"
          ref={(el) => (elementsRef.current[5] = el)}
          style={{ "--delay": "0.44s" }}
        >
          {["Made With Love And Care", "Cruelty Free (Eco Conscious)", "Paraben or Sulfats free","Naturally derived ingredients"].map((label) => (
            <span className="about__pill" key={label}>{label}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;