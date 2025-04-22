import React, { useState } from "react";
import "./TaskEditForm.css";

const TaskCreateForm = ({ onSave, onCancel, users }) => {
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Task Name : </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">User ID : </label>
            <select
              name="userId"
              id="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            >
              <option value="">Select a user</option>
              {users &&
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
              />
              Completed
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreateForm;
