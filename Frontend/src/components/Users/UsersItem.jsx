import React from "react";

const UsersItem = ({ user, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td className="user-actions">
        <button onClick={() => onEdit(user)} className="edit-button">
          edit
        </button>
        <button onClick={() => onDelete(user._id)} className="delete-button">
          Delete
        </button>
      </td>
    </tr>
  );
};
export default UsersItem;
