import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit, users = [] }) => {
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    const getUserName = async () => {
      // Case 1: User object is already populated and has name
      if (task.user && typeof task.user === "object" && task.user.name) {
        setUserName(task.user.name);
        return;
      }

      // Case 2: We have a userId (either from task.user or task.userId)
      const userId = task.userId || task.user;

      if (userId) {
        // First check if we already have this user in the users array
        const existingUser = users.find((u) => u._id === userId);
        if (existingUser) {
          setUserName(existingUser.name);
          return;
        }

        // If not in the users array, fetch from API
        try {
          const response = await axios.get(
            `http://localhost:3000/api/users/${userId}`
          );
          if (response.data && response.data.name) {
            setUserName(response.data.name);
          } else {
            setUserName("Unknown User");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setUserName("Unknown User");
        }
      } else {
        setUserName("No User Assigned");
      }
    };

    getUserName();
  }, [task.user, task.userId, users]);

  const statusClass = task.completed ? "status-completed" : "status-pending";

  return (
    <div className="task-item">
      <div className="task-details">
        <h3
          className={`text-lg ${
            task.completed ? "line-through text-gray-500" : "text-black"
          }`}
        >
          {task.name}
        </h3>
        <div className="task-meta">
          <span>user: {userName}</span>
          <hr />
          <span className={`ml-4 ${statusClass}`}>
            Status: {task.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      <div className="task-actions flex space-x-2">
        <button onClick={() => onToggleComplete(task._id, !task.completed)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button onClick={() => onEdit(task._id)}>Edit</button>

        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
