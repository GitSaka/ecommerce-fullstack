import React, { useRef, useEffect, useState } from "react";
import "./NewArrivals.css";
import { Link } from "react-router-dom";

const itemsData = [
  {
    id: 1,
    title: "Préservatifs Noix de Coco (édition limitée)",
    price: "3 800 FCFA",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Lubrifiant Sensation Chaude 150ml",
    price: "4 200 FCFA",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Bougie Nuit Romantique — Vanille Rose",
    price: "5 200 FCFA",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Préservatifs Ultra-Fins Premium",
    price: "3 500 FCFA",
    img: "https://images.unsplash.com/photo-1615461065624-6e46f31998a9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Lubrifiant Chocolat Noir 120ml",
    price: "3 100 FCFA",
    img: "https://images.unsplash.com/photo-1597848212419-59f4d942e332?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "Lubrifiant Chocolat Noir 120ml",
    price: "3 100 FCFA",
    img: "https://images.unsplash.com/photo-1597848212419-59f4d942e332?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    title: "Lubrifiant Chocolat Noir 120ml",
    price: "3 100 FCFA",
    img: "https://images.unsplash.com/photo-1597848212419-59f4d942e332?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    title: "Lubrifiant Chocolat Noir 120ml",
    price: "3 100 FCFA",
    img: "https://images.unsplash.com/photo-1597848212419-59f4d942e332?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    title: "Lubrifiant Chocolat Noir 120ml",
    price: "3 100 FCFA",
    img: "https://images.unsplash.com/photo-1597848212419-59f4d942e332?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    title: "Lubrifiant Chocolat Noir 120ml",
    price: "3 100 FCFA",
    img: "https://images.unsplash.com/photo-1597848212419-59f4d942e332?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11,
    title: "Lubrifiant Chocolat Noir 120ml",
    price: "3 100 FCFA",
    img: "https://images.unsplash.com/photo-1597848212419-59f4d942e332?auto=format&fit=crop&w=600&q=80",
  },
];

export default function NewArrivals() {
  const trackRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(320); // fallback

  // calcule une distance de scroll basée sur la taille réelle d'une card
  useEffect(() => {
    function compute() {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector(".arrival-card");
      if (!card) return;
    //   const style = getComputedStyle(card);
      const gap = parseFloat(getComputedStyle(track).gap) || 14;
      const width = card.offsetWidth + gap;
      // on veut scroller ~2 cartes (ajuste si besoin)
      setScrollAmount(Math.round(width * 2));
    }

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const scroll = (dir = "next") => {
    const track = trackRef.current;
    if (!track) return;
    const left = dir === "next" ? scrollAmount : -scrollAmount;
    track.scrollBy({ left, behavior: "smooth" });
  };

  return (
    <section className="newarrivals-section">
      <div className="top-row">
        <h2 className="arrival-title">
          <span className="badge">✨ Nouveautés</span>
          Nos derniers produits
        </h2>

        <div className="controls">
          <button aria-label="Précédent" className="arrow-btn" onClick={() => scroll("prev")}>
            ‹
          </button>
          <button aria-label="Suivant" className="arrow-btn" onClick={() => scroll("next")}>
            ›
          </button>
        </div>
      </div>

      <div className="carousel-wrapper">
        <div className="carousel-track" ref={trackRef}>
          {itemsData.map((item) => (
            <Link key={item.id} className="arrival-card" to={`/product/${item.id}`}>
              <img src={item.img} alt={item.title} className="arrival-img" loading="lazy" />
              <div className="arrival-body">
                <h3>{item.title}</h3>
                <p className="price">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
