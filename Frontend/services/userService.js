import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    console.error(`API Error: ${errorMessage}`);
    throw new Error(errorMessage);
  }
);

export const userService = {
  getUsers: async () => {
    try {
      return await apiClient.get("");
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      return await apiClient.get(`/${userId}`);
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      return await apiClient.post("", userData);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      return await apiClient.put(`/${userId}`, userData);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      await apiClient.delete(`/${userId}`);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};
