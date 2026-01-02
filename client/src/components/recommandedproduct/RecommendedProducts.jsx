import React from "react";
import "./recommended.css";

export default function RecommendedProducts() {
  const products = [
    {
      id: 1,
      title: "Préservatifs Durex Extra Safe (12 pcs)",
      price: 3500,
      img: "https://images.unsplash.com/photo-1615461065624-6e46f31998a9?w=600",
    },
    {
      id: 2,
      title: "Lubrifiant Intime Aloe Vera 100ml",
      price: 2900,
      img: "https://images.unsplash.com/photo-1597848212419-59f4d942e332?w=600",
    },
    {
      id: 3,
      title: "Bougie Parfumée Romance — Vanille Rose",
      price: 4500,
      img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600",
    },
    {
      id: 4,
      title: "Préservatifs Ultra Sensation",
      price: 3200,
      img: "https://images.unsplash.com/photo-1619941424023-a9e8f4d2edb8?w=600",
    },
    {
      id: 5,
      title: "Gel Chauffant Plaisir Intense 50ml",
      price: 2700,
      img: "https://images.unsplash.com/photo-1600185365483-26d7a4d14b09?w=600",
    },
    {
      id: 6,
      title: "Lubrifiant Chocolat 120ml",
      price: 3300,
      img: "https://images.unsplash.com/photo-1563170423-18f482d82cc8?w=600",
    },
  ];

  return (
    <section className="recommended-container">
      <h2 className="recommended-title">✨ Produits Recommandés Pour Vous</h2>

      <div className="recommended-grid">
        {products.map((item) => (
          <div className="recommended-card" key={item.id}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p className="price">{item.price} FCFA</p>
          </div>
        ))}
      </div>
    </section>
  );
}
