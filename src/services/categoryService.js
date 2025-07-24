import api from "./api";

const categoryService = {
  // Get all categories
  getCategories: () => {
    return api.get("/categories");
  },

  // Get categories with product count
  getCategoriesWithCount: () => {
    return api.get("/categories/with-count");
  },

  // Get single category by ID
  getCategory: (id) => {
    return api.get(`/categories/${id}`);
  },

  // Get category by slug
  getCategoryBySlug: (slug) => {
    return api.get(`/categories/slug/${slug}`);
  },

  // Admin: Create category
  createCategory: (categoryData) => {
    return api.post("/categories", categoryData);
  },

  // Admin: Update category
  updateCategory: (id, categoryData) => {
    return api.put(`/categories/${id}`, categoryData);
  },

  // Admin: Delete category
  deleteCategory: (id) => {
    return api.delete(`/categories/${id}`);
  },
};

export default categoryService;
