import React from "react";
import "./productlist.css";
import { Link } from "react-router-dom";

export default function ProductsSection() {
  const products = [
    {
      id: 1,
      name: "Préservatifs Durex Love - 12 unités",
      price: 3500,
      oldPrice: 4000,
      image:
        "./1.jpeg",
      tag: "-12%",
    },
    {
      id: 2,
      name: "Lubrifiant Intime Aloe Vera - 100ml",
      price: 5000,
      oldPrice: 5800,
      image:
        "./2.jpeg",
      tag: "-14%",
    },
    {
      id: 3,
      name: "Bougie Parfumée Romance",
      price: 4500,
      oldPrice: 5000,
      image:
        "./4.jpeg",
      tag: "-10%",
    },
    {
      id: 4,
      name: "Spray Parfum Corps - Passion",
      price: 6000,
      oldPrice: 6500,
     image:
        "./3.jpeg",
      tag: "-8%",
    },
  ];

  return (
    <section className="products-section">
      <div className="products-header">
        <h2>✨ Produits Populaires</h2>
        <button className="see-all">Voir tout</button>
      </div>

      <div className="products-grid">
        {products.map((p) => (

          <Link key={p.id} to={`/product/${p.id}`}  className="link-no-style">

          <div className="product-card">
            <div className="img-container">
              <span className="discount-tag">{p.tag}</span>
              <img src={p.image} alt={p.name} />
            </div>

            <h3 className="product-name">{p.name}</h3>

            <div className="prices">
              <span className="price">{p.price} FCFA</span>
              <span className="old-price">{p.oldPrice} FCFA</span>
            </div>

            <button className="add-cart">Ajouter au panier</button>
          </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
