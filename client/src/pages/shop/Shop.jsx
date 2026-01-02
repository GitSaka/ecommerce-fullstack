import React, { useState } from "react";
import "./shop.css";

const productsData = [
  { id: 1, name: "Préservatif Durex Classic", price: 1500, brand: "Durex", isNew: true, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&w=600" },
  { id: 2, name: "Lubrifiant Intime Aqua", price: 2000, brand: "AquaSense", isNew: false, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&w=600" },
  { id: 3, name: "Préservatif Skin Feeling", price: 1800, brand: "Skin", isNew: true, img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=600" },
  { id: 4, name: "Lubrifiant Naturel", price: 1200, brand: "Naturel", isNew: false, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&w=600" },
  { id: 5, name: "Lubrifiant Naturel", price: 1200, brand: "Naturel", isNew: false, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&w=600" },
  { id: 6, name: "Lubrifiant Naturel", price: 1200, brand: "Naturel", isNew: false, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&w=600" },
  { id: 7, name: "Lubrifiant Naturel", price: 1200, brand: "Naturel", isNew: false, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&w=600" },
  // Tu ajouteras plus tard depuis ton backend
];

export default function Shop() {
   const [filters, setFilters] = useState({
    price: "",
    brand: "",
    newOnly: false
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 13;

  const filteredProducts = productsData.filter((p) => {
    const priceMatch =
      filters.price === "low"
        ? p.price < 2000
        : filters.price === "medium"
        ? p.price >= 1000 && p.price <= 2000
        : filters.price === "high"
        ? p.price > 2000
        : true;

    const brandMatch = filters.brand ? p.brand === filters.brand : true;

    const newMatch = filters.newOnly ? p.isNew : true;

    return priceMatch && brandMatch && newMatch;
  });

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="boutique-container">

      {/* SECTION FILTRES PREMIUM */}
      <div className="filter-section">

        <div className="filter-header">
          <h3>Filtres</h3>
          <button
            className="reset-btn"
            onClick={() =>
              setFilters({ price: "", brand: "", newOnly: false })
            }
          >
            Réinitialiser
          </button>
        </div>

        <div className="filters-grid">

          {/* Prix */}
          <div className="filter-box">
            <label>Par prix</label>
            <select
              value={filters.price}
              onChange={(e) =>
                setFilters({ ...filters, price: e.target.value })
              }
            >
              <option value="">Tous les prix</option>
              <option value="low">0 — 2000</option>
              <option value="medium">1000 — 2000</option>
              <option value="high">2000+</option>
            </select>
          </div>

          {/* Marque */}
          <div className="filter-box">
            <label>Par marque</label>
            <select
              value={filters.brand}
              onChange={(e) =>
                setFilters({ ...filters, brand: e.target.value })
              }
            >
              <option value="">Toutes marques</option>
              <option value="Durex">Durex</option>
              <option value="Skin">Skin</option>
              <option value="AquaSense">AquaSense</option>
              <option value="Naturel">Naturel</option>
            </select>
          </div>

          {/* Nouveautés */}
          <div className="filter-box">
            <label>Nouveautés</label>
            <div className="checkbox-row">
              <input
                type="checkbox"
                checked={filters.newOnly}
                onChange={(e) =>
                  setFilters({ ...filters, newOnly: e.target.checked })
                }
              />
              <span>Afficher seulement</span>
            </div>
          </div>

        </div>
      </div>

      {/* GRILLE PRODUITS */}
      <div className="products-grid">
        {visibleProducts.length === 0 ? (
          <p className="no-results">Aucun produit trouvé…</p>
        ) : (
          visibleProducts.map((p) => (
            <div className="product-card" key={p.id}>
                {p.isNew && <label className="badge-new">Nouveautés</label>}
              <img src={p.img} alt={p.name} />
              <h4>{p.name}</h4>
              <p className="price">{p.price} FCFA</p>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION DYNAMIQUE */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </div>
  );
}
