import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useAuthStore();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes with layout */}
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="checkout/success" element={<CheckoutSuccessPage />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/products"
          element={
            <ProtectedRoute requiredRole="admin">
              <ProductManagementPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
