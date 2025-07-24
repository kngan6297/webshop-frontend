import { create } from "zustand";
import { persist } from "zustand/middleware";
import authService from "../services/authService";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      // Login
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(email, password);
          set({
            user: response.data.data.user,
            token: response.data.data.token,
            isLoading: false,
          });
          toast.success("Login successful!");
          return response;
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.response?.data?.message || "Login failed");
          throw error;
        }
      },

      // Register
      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(userData);
          set({
            user: response.data.data.user,
            token: response.data.data.token,
            isLoading: false,
          });
          toast.success("Registration successful!");
          return response;
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.response?.data?.message || "Registration failed");
          throw error;
        }
      },

      // Logout
      logout: () => {
        set({ user: null, token: null });
        toast.success("Logged out successfully");
      },

      // Update profile
      updateProfile: async (profileData) => {
        set({ isLoading: true });
        try {
          const response = await authService.updateProfile(profileData);
          set({
            user: response.data.data,
            isLoading: false,
          });
          toast.success("Profile updated successfully!");
          return response;
        } catch (error) {
          set({ isLoading: false });
          toast.error(error.response?.data?.message || "Profile update failed");
          throw error;
        }
      },

      // Check if user is admin
      isAdmin: () => {
        const { user } = get();
        return user?.role === "admin";
      },

      // Check if user is authenticated
      isAuthenticated: () => {
        const { user, token } = get();
        return !!(user && token);
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
