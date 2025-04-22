# Task-manager-app

## Project Overview

A full-stack task management application built with React.js frontend and Express.js/MongoDB backend. This application allows users to create, view, edit, and delete tasks with user assignment capabilities.

## Features

- **Task Management**: Create, update, delete, and mark tasks as complete
- **User Management**: Associate tasks with specific users
- **Search Functionality**: Filter tasks by name
- **Pagination**: Navigate through multiple pages of tasks
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- React.js with Hooks (useState, useEffect)
- Axios for API communication
- CSS for styling
- Vite for build tooling

### Backend

- Express.js server
- MongoDB with Mongoose
- JWT for authentication
- RESTful API architecture

## Project Structure

The project is organized into two main directories:

### Backend

- API routes for tasks, users, and authentication
- MongoDB models and controllers
- Configuration for database connection

### Frontend

- React components for task management
- Services for API communication
- Responsive UI with modern design patterns
- Example components demonstrating React concepts (Effects, Conditional Rendering)

## Getting Started

1. Clone the repository

   ```
   git clone https://github.com/yourusername/task-manager-app.git
   cd task-manager-app
   ```

2. Install dependencies for both Frontend and Backend:

   ```
   # For Backend
   cd backend
   npm install

   # For Frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables in Backend/.env:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:

   ```
   # Start Backend server
   cd backend
   npm run dev

   # Start Frontend development server
   cd ../frontend
   npm run dev
   ```

## API Documentation

The backend provides the following API endpoints:

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user

## Contributing

We welcome contributions to improve the Task Manager App!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/""`)
3. Commit your changes (`git commit -m ''`)
4. Push to the branch (`git push origin feature/""`)
5. Open a Pull Request

## Future Improvements

- Implement task categories and tags
- Add due dates and notifications
- Create a mobile app version
- Add data visualization for task analytics
- Implement team collaboration features
