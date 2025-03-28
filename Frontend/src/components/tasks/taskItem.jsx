import React from "react";

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div className="task-item flex justify-between items-center p-4 border-b">
      <div className="task-details flex-grow">
        <h3
          className={`text-lg ${
            task.completed ? "line-through text-gray-500" : "text-black"
          }`}
        >
          {task.name}
        </h3>
        <div className="task-meta text-sm text-gray-600">
          <span>user: {task.user}</span>
          <hr />
          <span className="ml-4">
            Status: {task.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      <div className="task-actions flex space-x-2">
        <button
          onClick={() => onToggleComplete(task._id, !task.completed)}
          className={`px-3 py-1 rounded ${
            task.completed
              ? "bg-yellow-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
