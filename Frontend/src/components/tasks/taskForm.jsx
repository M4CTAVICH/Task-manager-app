import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService.js';
import { userService } from '../../services/userService.js';


const TaskForm = ({ onTaskCreated, initialTask = null }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    completed: false,
    userId: '',
    age: 0
  });
  const [error, setError] = useState(null);

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await userService.getUsers();
        setUsers(userData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();

    // If editing an existing task
    if (initialTask) {
      setFormData({
        name: initialTask.name,
        completed: initialTask.completed,
        userId: initialTask.user,
        age: initialTask.age
      });
    }
  }, [initialTask]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      
      if (!formData.name || !formData.userId) {
        setError('Please fill in all required fields');
        return;
      }

      
      const taskData = {
        name: formData.name,
        completed: formData.completed,
        userId: formData.userId,
        age: formData.age
      };

      let result;
      if (initialTask) {
        
        result = await taskService.updateTask(initialTask._id, taskData);
      } else {
        
        result = await taskService.createTask(taskData);
      }

     
      setFormData({
        name: '',
        completed: false,
        userId: '',
        age: 0
      });
      
      if (onTaskCreated) onTaskCreated(result.task);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl mb-4">
        {initialTask ? 'Edit Task' : 'Create New Task'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Task Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter task name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter age"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Assigned User</label>
        <select
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              completed: e.target.checked
            }))}
            className="mr-2"
          />
          <span>Completed</span>
        </label>
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {initialTask ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;