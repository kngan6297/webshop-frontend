import api from "./api";

const authService = {
  // Register new user
  register: (userData) => {
    return api.post("/auth/register", userData);
  },

  // Login user
  login: (email, password) => {
    return api.post("/auth/login", { email, password });
  },

  // Get user profile
  getProfile: () => {
    return api.get("/auth/profile");
  },

  // Update user profile
  updateProfile: (profileData) => {
    return api.put("/auth/profile", profileData);
  },

  // Change password
  changePassword: (currentPassword, newPassword) => {
    return api.put("/auth/change-password", { currentPassword, newPassword });
  },
};

export default authService;
