import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService.js";
import UserItem from "./UsersItem.jsx";
import UserEditForm from "./UserEditForm.jsx";
import UserCreateForm from "./UserCreateForm.jsx";
import "./UserList.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getUsers();
      setUsers(usersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (user) => {
    setEditingUser(user);
  };
  const handleCancelEdit = () => {
    setEditingUser(null);
  };
  const handleSaveEdit = async (updatedUser) => {
    try {
      const result = await userService.updateUser(updatedUser._id, updatedUser);

      const updatedData = result.user || result;
      setUsers(
        users.map((user) =>
          user._id === updatedUser._id ? { ...user, ...updatedData } : user
        )
      );
      setEditingUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const result = await userService.createUser(userData);
      const newUser = result.user || result;
      setUsers([...users, newUser]);
      setIsCreating(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>loading users .....</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">Error : {error}</p>
        <button
          onClick={() => {
            setError(null);
            fetchUsers();
          }}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <div className="users-header">
        <h2>Users Management</h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="create-user-button"
          >
            Create a New User
          </button>
        )}
      </div>
      {isCreating && (
        <UserCreateForm
          onSave={handleCreateUser}
          onCancel={handleCancelCreate}
        />
      )}
      {editingUser && (
        <UserEditForm
          user={editingUser}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
      <div className="users-table-container">
        {users.length === 0 ? (
          <p className="no-users">No users found.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  onEdit={handleStartEdit}
                  onDelete={handleDeleteUser}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default UsersList;
