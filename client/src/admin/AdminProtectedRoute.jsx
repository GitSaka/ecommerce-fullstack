import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = true;
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}
