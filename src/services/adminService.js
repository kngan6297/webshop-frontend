import api from "./api";

const adminService = {
  // Get dashboard stats
  getDashboardStats: () => {
    return api.get("/admin/stats");
  },

  // Get recent products
  getRecentProducts: () => {
    return api.get("/admin/recent-products");
  },

  // Get recent users
  getRecentUsers: () => {
    return api.get("/admin/recent-users");
  },

  // Get all users
  getAllUsers: (page = 1, limit = 10) => {
    return api.get(`/admin/users?page=${page}&limit=${limit}`);
  },

  // Get all products
  getAllProducts: (page = 1, limit = 10) => {
    return api.get(`/admin/products?page=${page}&limit=${limit}`);
  },

  // Create new product
  createProduct: (productData) => {
    return api.post("/admin/products", productData);
  },

  // Get single product
  getProduct: (id) => {
    return api.get(`/admin/products/${id}`);
  },

  // Update product
  updateProduct: (id, productData) => {
    return api.put(`/admin/products/${id}`, productData);
  },

  // Delete product
  deleteProduct: (id) => {
    return api.delete(`/admin/products/${id}`);
  },

  // Get categories
  getCategories: () => {
    return api.get("/categories");
  },
};

export default adminService;
