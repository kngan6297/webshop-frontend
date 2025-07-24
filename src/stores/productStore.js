import { create } from "zustand";
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  currentProduct: null,
  categories: [],
  isLoading: false,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  },
  filters: {
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },

  // Fetch all products
  fetchProducts: async (page = 1, filters = {}) => {
    set({ isLoading: true });
    try {
      const response = await productService.getProducts(page, filters);
      set({
        products: response.data.data.products,
        pagination: response.data.data.pagination,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      toast.error("Failed to fetch products");
    }
  },

  // Fetch featured products
  fetchFeaturedProducts: async () => {
    try {
      const response = await productService.getFeaturedProducts();
      set({ featuredProducts: response.data.data });
    } catch (error) {
      toast.error("Failed to fetch featured products");
    }
  },

  // Fetch single product
  fetchProduct: async (id) => {
    set({ isLoading: true });
    try {
      const response = await productService.getProduct(id);
      set({
        currentProduct: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      toast.error("Failed to fetch product");
    }
  },

  // Search products
  searchProducts: async (query, page = 1) => {
    set({ isLoading: true });
    try {
      const response = await productService.searchProducts(query, page);
      set({
        products: response.data.data.products,
        pagination: response.data.data.pagination,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      toast.error("Search failed");
    }
  },

  // Add product rating
  addRating: async (productId, ratingData) => {
    try {
      const response = await productService.addRating(productId, ratingData);
      set({ currentProduct: response.data.data });
      toast.success("Rating added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add rating");
    }
  },

  // Fetch categories
  fetchCategories: async () => {
    try {
      const response = await categoryService.getCategories();
      set({ categories: response.data.data });
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  },

  // Update filters
  updateFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },

  // Clear filters
  clearFilters: () => {
    set({
      filters: {
        category: "",
        minPrice: "",
        maxPrice: "",
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    });
  },

  // Clear current product
  clearCurrentProduct: () => {
    set({ currentProduct: null });
  },
}));
