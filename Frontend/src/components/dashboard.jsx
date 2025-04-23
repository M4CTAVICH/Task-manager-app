import { useAuth } from "../context/authContext";

function Dashboard({ onNavigate }) {
  const { user } = useAuth();

  const handleViewMyTasks = () => {
    onNavigate("tasklist", { userId: user._id });
  };
  const handleCreateNewTask = () => {
    onNavigate("createtask", { userId: user._id });
  };

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <div className="user-info">
        <h3>Welcome, {user.name}</h3>
        <p>Email: {user.email}</p>
        {user._id && <p>User ID: {user._id}</p>}
      </div>
      <div className="dashboard-actions">
        <h3>Quick Actions</h3>
        <button onClick={handleViewMyTasks}>View My Tasks</button>
        <button onClick={handleCreateNewTask}>Create New Task</button>
        <button>Edit Profile</button>
      </div>
    </div>
  );
}

export default Dashboard;
