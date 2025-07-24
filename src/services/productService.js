import api from "./api";

const productService = {
  // Get all products with filters
  getProducts: (page = 1, filters = {}) => {
    const params = new URLSearchParams({
      page,
      limit: 12,
      ...filters,
    });
    return api.get(`/products?${params}`);
  },

  // Get featured products
  getFeaturedProducts: () => {
    return api.get("/products/featured");
  },

  // Get single product by ID
  getProduct: (id) => {
    return api.get(`/products/${id}`);
  },

  // Get product by slug
  getProductBySlug: (slug) => {
    return api.get(`/products/slug/${slug}`);
  },

  // Search products
  searchProducts: (query, page = 1) => {
    return api.get(`/products/search?q=${query}&page=${page}`);
  },

  // Get products by category
  getProductsByCategory: (categoryId, page = 1) => {
    return api.get(`/products/category/${categoryId}?page=${page}`);
  },

  // Add product rating
  addRating: (productId, ratingData) => {
    return api.post(`/products/${productId}/ratings`, ratingData);
  },

  // Update product rating
  updateRating: (productId, ratingData) => {
    return api.put(`/products/${productId}/ratings`, ratingData);
  },

  // Admin: Create product
  createProduct: (productData) => {
    return api.post("/products", productData);
  },

  // Admin: Update product
  updateProduct: (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },

  // Admin: Delete product
  deleteProduct: (id) => {
    return api.delete(`/products/${id}`);
  },
};

export default productService;
