import { Navigate } from "react-router-dom";

const AdminGuestRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  // 👉 Si déjà connecté → redirection dashboard
  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default AdminGuestRoute;
