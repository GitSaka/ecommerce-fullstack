import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass =
    "block px-4 py-2 rounded hover:bg-gray-700 transition";

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="p-4 space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/cathegorie/cathegorielist" className={linkClass}>
          Cathegories
        </NavLink>
        <NavLink to="/admin/product/productlist" className={linkClass}>
          Produits
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          Commandes
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          Utilisateurs
        </NavLink>
      </nav>
    </aside>
  );
}
