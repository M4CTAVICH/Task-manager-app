import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const [userName, setUserName] = useState("Loading...");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (task.user) {
          const response = await axios.get(`/api/users/${task.user}`);
          if (response.data && response.data.name) {
            setUserName(response.data.name);
          } else {
            setUserName("Unknown User");
          }
        } else {
          setUserName("No User Assigned");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserName("Unknown User");
      }
    };

    fetchUserData();
  }, [task.user]);
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
