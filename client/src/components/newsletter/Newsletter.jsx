import React from "react";
import "./Newsletter.css";

export default function Newsletter() {
  return (
    <div className="newsletter-section">
      <div className="newsletter-container">
        <h2>Restez informé des nouveautés ✨</h2>
        <p>
          Inscrivez-vous pour recevoir nos promotions et nouveaux produits.
        </p>

        <div className="newsletter-form">
          <div className="newsletter-input">
            <span className="mail-icon">📧</span>
            <input type="email" placeholder="Votre adresse email" />
          </div>

          <button className="newsletter-btn">S’inscrire</button>
        </div>
      </div>
    </div>
  );
}
