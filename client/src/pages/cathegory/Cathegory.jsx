import React, { useState } from "react";
import "./categorypage.css";
import { Link, useParams } from "react-router-dom";

const CategoryPage = () => {
  const [filters, setFilters] = useState({
    price: "",
    brand: "",
    sort: "",
  });
   const { category } = useParams();


  // Fake produits (tu remplaceras par tes données API)
  const products = [
    { id: 1, name: "iPhone 14", brand: "apple", price: 620000, isNew: true },
    { id: 2, name: "Samsung S22", brand: "samsung", price: 450000, isNew: false },
    { id: 3, name: "Tecno Spark 10", brand: "tecno", price: 90000, isNew: true },
    { id: 4, name: "Infinix Note 30", brand: "infinix", price: 120000, isNew: false },
    { id: 5, name: "Infinix Note 30", brand: "infinix", price: 120000, isNew: false },
    { id: 6, name: "Infinix Note 30", brand: "infinix", price: 120000, isNew: false },
    { id: 7, name: "Infinix Note 30", brand: "infinix", price: 120000, isNew: false },
  ];

  // ---- FILTRAGE DES PRODUITS ----
  const filteredProducts = products
    .filter((p) => {
      // FILTRE PAR PRIX
      if (filters.price === "0-5000") return p.price <= 5000;
      if (filters.price === "5000-20000") return p.price >= 5000 && p.price <= 20000;
      if (filters.price === "20000-50000") return p.price >= 20000 && p.price <= 50000;
      if (filters.price === "50000+") return p.price >= 50000;
      return true;
    })
    .filter((p) => {
      // FILTRE PAR MARQUE
      if (!filters.brand) return true;
      return p.brand === filters.brand;
    })
    .sort((a, b) => {
      // TRI
      if (filters.sort === "new") return a.isNew - b.isNew;
      if (filters.sort === "price-asc") return a.price - b.price;
      if (filters.sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="category-page">

      {/* ------------------ FILTRE PREMIUM ------------------ */}
      <div className="filter-bar">

        {/* PRIX */}
        <div className="displaynone filter-section">
          <h4>Filtrer par prix</h4>
          <select
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">Tous les prix</option>
            <option value="0-5000">0 - 5 000 FCFA</option>
            <option value="5000-20000">5 000 - 20 000 FCFA</option>
            <option value="20-50000">20 000 - 50 000 FCFA</option>
            <option value="50000+">50 000+ FCFA</option>
          </select>
        </div>

        {/* MARQUE */}
        <div className="filter-section">
          <h4>Filtrer par marque</h4>
          <select
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          >
            <option value="">Toutes les marques</option>
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
            <option value="tecno">Tecno</option>
            <option value="infinix">Infinix</option>
          </select>
        </div>

        {/* TRIER */}
        <div className="filter-section">
          <h4>Trier</h4>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="">Par défaut</option>
            <option value="new">Nouveautés</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>

      </div>

      {/* ------------------ LISTE DES PRODUITS ------------------ */}
      <h4>{category}</h4>
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          filteredProducts.map((product) => (
            <Link key={product.id} className="arrival-card" to={`/product/${product.id}`}>

              <div  className="product-card">
                <div className="img-box">
                     
                </div>
                <h3>{product.name}</h3>
                <p className="brand">{product.brand.toUpperCase()}</p>
                <p className="price">{product.price.toLocaleString()} FCFA</p>
                {product.isNew && <span className="badge">Nouveau</span>}
              </div>
            </Link>
          ))
        )}
      </div>

    </div>
  );
};

export default CategoryPage;
