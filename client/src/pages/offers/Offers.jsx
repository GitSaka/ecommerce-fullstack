import React from "react";
import "./offers.css"; // le CSS pur sera ici
import { products } from "../../data";
// import products from "../data/products"; // adapte selon ton projet

export default function Offers() {
  const discountedProducts = products.filter(p => p.discount && p.discount > 0);

  return (
    <div className="offers-container">
      <h1 className="offers-title">🔥 Offres Spéciales du Jour</h1>
      <p className="offers-subtitle">
        Profitez des réductions exceptionnelles sur nos packs et produits.
      </p>

      <div className="offers-grid">
        {discountedProducts.map((product) => (
          <div className="offer-card" key={product.id}>
            <img src={product.image} alt={product.name} className="offer-img" />

            <h3 className="offer-name">{product.name}</h3>

            <p className="offer-old-price">{product.price} FCFA</p>

            <p className="offer-new-price">
              {product.price - (product.price * product.discount) / 100} FCFA
            </p>

            <span className="offer-badge">-{product.discount}%</span>

            <button className="offer-btn">Voir le produit</button>
          </div>
        ))}
      </div>
    </div>
  );
};


