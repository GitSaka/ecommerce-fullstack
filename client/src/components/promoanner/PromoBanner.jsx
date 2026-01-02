import { Link } from "react-router-dom";
import "./PromoBanner.css";

export default function PromoBanner() {
  return (
    <section className="promo-banner">
      <div className="promo-content">
        <h2>🔥 -30% sur les Packs Sécurité Intime</h2>
        <p>Préservatifs, lubrifiants et accessoires en promotion aujourd’hui seulement.</p>
        <Link to={"/offers"} className="link-no-style">
        <button className="promo-btn">Voir les Offres</button>
        </Link>
      </div>

      <div className="promo-image">
        <img 
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
          alt="Promotion produits intimes"
        />
      </div>
    </section>
  );
}
