import React, { useState } from "react";

const UserEditForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    _id: user._id,
    name: user.name,
    email: user.email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = { ...formData };
    if (!formData.password) {
      delete submitData.password;
    }
    onSave(submitData);
  };
  return (
    <div className="user-form">
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="edit-name">Name : </label>
          <input
            type="text"
            id="edit-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="edit-email">Email:</label>
          <input
            type="email"
            id="edit-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="edit-password">password(optional) :</label>
          <input
            type="password"
            name="password"
            id="edit-password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};
export default UserEditForm;
