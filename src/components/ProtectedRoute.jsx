import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isAuthenticated, isAdmin } = useAuthStore();

  // Check if user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Check if specific role is required
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
