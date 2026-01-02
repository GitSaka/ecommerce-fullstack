import { useRef } from "react";
import "./arrivalsnew.css";

const items = [
  { id: 1, title: "Produit 1", price: "3500 FCFA", img: "/img/p1.jpg" },
  { id: 2, title: "Produit 2", price: "4500 FCFA", img: "/img/p2.jpg" },
  { id: 3, title: "Produit 3", price: "5500 FCFA", img: "/img/p3.jpg" },
  { id: 4, title: "Produit 4", price: "6500 FCFA", img: "/img/p4.jpg" },
  { id: 5, title: "Produit 5", price: "7500 FCFA", img: "/img/p5.jpg" },
];

export default function ArrivalsNew() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <section className="na-section">
      <div className="na-header">
        <h2>🆕 Nos Nouveautés</h2>
        <div className="na-arrows">
          <button onClick={scrollLeft}>&lt;</button>
          <button onClick={scrollRight}>&gt;</button>
        </div>
      </div>

      <div className="na-carousel" ref={scrollRef}>
        {items.map((item) => (
          <div className="na-card" key={item.id}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
