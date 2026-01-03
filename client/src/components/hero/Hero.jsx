// src/components/HeroCarousel.jsx
import React, { useState, useEffect } from "react";
import "./hero.css";
import { Link } from "react-router-dom";
// import api from "../../admin/services/api";

export default function Hero() {

  // const [slides, setSlides] = useState([]);
  // const imageBaseURL = "http://localhost:5000/uploads/categories/";
  const slides = [
    {
      img:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
      title: "Préservatifs Premium",
      text: "Sécurité, douceur et confort pour vos moments intimes.",
      btn: "Découvrir",
    },
    {
      img:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      title: "Lubrifiants Sensuels",
      text: "Améliorez le plaisir avec nos lubrifiants doux et naturels.",
      btn: "Voir la collection",
    },
    {
      img:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
      title: "Accessoires Intimes",
      text: "Pimentez vos moments avec des produits premium.",
      btn: "Explorer",
    },
  ];

  const [index, setIndex] = useState(0);

  // useEffect(()=>{
  //       const getAllcathe = async()=>{
  //           try {
  //               const res = await api.get('/categories');
  //               setSlides(res.data)
  //               console.log(res.data)
  //           } catch (error) {
  //               console.log(error)
  //           }
  //       }

  //       getAllcathe();
  //   },[])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="hero-carousel" role="region" aria-label="Carrousel principal">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`slide ${i === index ? "active" : ""}`}
          aria-hidden={i === index ? "false" : "true"}
        >
          <img src={slide.img} alt={slide.title} />
          <div className="overlay" />
          <div className="content">
            <h1>{slide.title}</h1>
            <p>
              {slide.text.length > 100
                ? slide.text.slice(0, 200) + "..."
                : slide.text}
            </p>
            <Link to={"/category/"+slide.title} className="link-no-style">
              <button className="cta">Voir plus</button>
            </Link>
          </div>
        </div>
      ))}

      <button className="nav prev" onClick={prevSlide} aria-label="Slide précédente">
        ❮
      </button>
      <button className="nav next" onClick={nextSlide} aria-label="Slide suivante">
        ❯
      </button>
    </div>
  );
}
