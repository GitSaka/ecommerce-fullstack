import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1 - Logo */}
        <div className="footer-col">
          <h2 className="footer-logo">STORESENSUEL</h2>
          <p>
            Votre boutique intime pour des produits de qualité, garantis et
            discrets.
          </p>

          <div className="footer-socials">
            <span>📘</span>
            <span>📸</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h3>Liens rapides</h3>
          <ul>
            <li>Accueil</li>
            <li>Boutique</li>
            <li>Catégories</li>
            <li>Promotions</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li>CGV</li>
            <li>Confidentialité</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            <li>📍 Cotonou, Bénin</li>
            <li>📞 +229 00 00 00 00</li>
            <li>✉️ contact@storesensuel.com</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} StoreSensuel — Tous droits réservés.
      </div>
    </footer>
  );
}
