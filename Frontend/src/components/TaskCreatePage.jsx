import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { taskService } from "../services/taskService";
import "./TaskCreatePage.css";

function TaskCreatePage({ onNavigate }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const taskPayload = {
        ...formData,
        userId: user._id,
      };
      await taskService.createTask(taskPayload);
      setSuccess(true);
      setFormData({ name: "", completed: false });
      setTimeout(() => {
        onNavigate("tasklist", { userId: user._id });
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create task");
      console.error("Error creating task:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onNavigate("dashboard");
  };

  return (
    <div className="task-create-container">
      <h2>Create new task</h2>
      {success && (
        <div className="success-message">
          Task Created successfully! Redirecting to your tasks...
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="task-create-form">
        <div className="form-group">
          <label htmlFor="name">Task Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter task description"
            disabled={isSubmitting || success}
          />
        </div>

        <div
          className={`form-group checkbox ${
            formData.completed ? "checked" : ""
          }`}
        >
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            disabled={isSubmitting || success}
          />
          <label htmlFor="completed">Mark as completed</label>
        </div>

        <div className="form-group user-info">
          <p>
            this task will be assigned to: <strong>{user.name}</strong>
          </p>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
            disabled={isSubmitting || success}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="create-button"
            disabled={isSubmitting || success || !formData.name.trim()}
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default TaskCreatePage;
