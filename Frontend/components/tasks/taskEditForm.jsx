import React, { useState } from "react";
import "./TaskEditForm.css";

const TaskEditForm = ({ task, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    _id: task._id,
    name: task.name,
    completed: task.completed,
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
        <h2>Edit Task</h2>
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
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TaskEditForm;
