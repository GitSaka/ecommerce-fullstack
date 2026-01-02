import React, { useState } from "react";
import "./header.css";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"

export const Header = () => {
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const { totalQuantity } = useSelector((state) => state.cart);

  return (
    <>
    <header className="header-container">
      {/* --- Barre d'annonce --- */}
           
      <div className="announcement-bar">
        <div className="announcement-inner">
          ❤️ Promo spéciale : -30% sur les packs couples — Offre limitée ! 💕
        </div>
      </div>


      {/* --- Header Principal --- */}
      <div className="header-main">
        {/* Logo */}
        <Link to={"/"} className="link-no-style">
        <div className="logo">MonAmour</div>
        </Link>

        {/* Barre de recherche Desktop */}
        <div className="search-desktop">
          <input type="text" placeholder="Rechercher un produit..." />
          <button>🔍</button>
        </div>

        {/* Icônes */}
        <div className="header-icons">
          {/* Icône recherche mobile */}
          <button
            className="icon-btn mobile-only"
            onClick={() => setShowSearchMobile(!showSearchMobile)}
          >
            🔍
          </button>

          <button className="icon-btn">👤</button>
          <Link to={'/cart'}>
            <button className="icon-btn">
            🛒
            <span className="hnumber">{totalQuantity}</span>
            </button>
          </Link>
          <button className="icon-btn mobile-only">☰</button>
        </div>
      </div>

      {/* Barre de recherche Mobile (affichage conditionnel) */}
      {showSearchMobile && (
        <div className="search-mobile">
          <input type="text" placeholder="Rechercher..." />
          <button>🔍</button>
        </div>
      )}
    </header>
     
    </>
  );
}
