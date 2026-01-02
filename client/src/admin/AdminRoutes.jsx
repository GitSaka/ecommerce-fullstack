import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProtectedRoute from "./AdminProtectedRoute";

import AuthLayout from "../layout/AuthLayout";
import AdminLayout from "../layout/AdminLayout";
import ProductsList from "./pages/products/ProductsList";
import CreateProduct from "./pages/products/CreateProduct";
import AdminGuestRoute from "./AdminGuestRoute";
import CreateCategory from "./pages/cathegorie/CreateCategory";
import CategoriesList from "./pages/cathegorie/CategoriesList";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* ADMIN LOGIN → sans header */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<AdminGuestRoute>
                              <AdminLogin />
                            </AdminGuestRoute>} />
      </Route>

      {/* ADMIN DASHBOARD → protégé + layout admin */}
      <Route
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
        
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="product/productlist" element={<ProductsList />} />
        <Route path="product/createproduct" element={<CreateProduct />} />
        <Route path="cathegorie/createcathegorie" element={<CreateCategory />} />
        <Route path="cathegorie/cathegorielist" element={<CategoriesList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
