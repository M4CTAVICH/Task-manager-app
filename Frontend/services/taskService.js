import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
);

export const taskService = {
  getTasks: async (page = 1, search = "", limit = 10) => {
    try {
      return await apiClient.get("", {
        params: { page, search, limit },
      });
    } catch (error) {
      console.error("Error while getting tasks:", error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      return await apiClient.post("", taskData);
    } catch (error) {
      console.error("Error while creating task:", error);
      throw error;
    }
  },

  updateTask: async (taskId, taskData) => {
    try {
      return await apiClient.put(`/${taskId}`, taskData);
    } catch (error) {
      console.error("Error while updating task:", error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      return await apiClient.delete(`/${taskId}`);
    } catch (error) {
      console.error("Error while deleting task:", error);
      throw error;
    }
  },

  getTask: async (taskId) => {
    try {
      return await apiClient.get(`/${taskId}`);
    } catch (error) {
      console.error("Error while getting task by id:", error);
      throw error;
    }
  },

  getTaskByUser: async (userId) => {
    try {
      return await apiClient.get(`/user/${userId}`);
    } catch (error) {
      console.error("Error while getting tasks by user:", error);
      throw error;
    }
  },
};
