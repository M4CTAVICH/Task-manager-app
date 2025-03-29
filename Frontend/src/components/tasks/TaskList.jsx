import React, { useState, useEffect } from "react";
import { taskService } from "../../services/taskService.js";
import { userService } from "../../services/userService.js";
import TaskEditForm from "./taskEditForm";
import TaskCreateForm from "./TaskCreateForm";
import TaskItem from "./taskItem";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 0,
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasksData, usersData] = await Promise.all([
          taskService.getTasks(pagination.page, pagination.search),
          userService.getUsers(),
        ]);

        setTasks(tasksData.tasks);
        setUsers(usersData);
        setPagination((prev) => ({
          ...prev,
          totalPages: tasksData.totalPages,
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination.page, pagination.search]);

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, { completed });
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStartEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    if (taskToEdit) {
      setEditingTask(taskToEdit);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleSaveEdit = async (updatedTask) => {
    try {
      const { _id, name, completed } = updatedTask;
      const result = await taskService.updateTask(_id, { name, completed });
      setTasks(tasks.map((task) => (task._id === _id ? result : task)));
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([newTask, ...tasks]);
      setIsCreating(false);

      if (pagination.totalPages > 1) {
        const tasksData = await taskService.getTasks(
          pagination.page,
          pagination.search
        );
        setTasks(tasksData.tasks);
        setPagination((prev) => ({
          ...prev,
          totalPages: tasksData.totalPages,
        }));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {editingTask && (
        <TaskEditForm
          task={editingTask}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}

      {isCreating && (
        <TaskCreateForm
          onSave={handleCreateTask}
          onCancel={handleCancelCreate}
          users={users}
        />
      )}

      <div className="task-list-header">
        <h2>Task List</h2>
        <button
          className="create-task-button"
          onClick={() => setIsCreating(true)}
        >
          Create New Task
        </button>
      </div>

      <div className="search-pagination">
        <input
          type="text"
          placeholder="Search tasks..."
          value={pagination.search}
          onChange={(e) =>
            setPagination((prev) => ({
              ...prev,
              search: e.target.value,
              page: 1,
            }))
          }
          className="search-input"
        />

        <div className="pagination">
          {pagination.totalPages > 0 &&
            [...Array(pagination.totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: index + 1 }))
                }
                className={`pagination-button ${
                  pagination.page === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>

      <div className="tasks-container">
        {tasks.length === 0 ? (
          <div className="no-tasks">No tasks found</div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              user={users.find((user) => user._id === task.userId)}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              onEdit={handleStartEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
