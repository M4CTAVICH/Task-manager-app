import { useAuth } from "./AuthContext";

function Dashboard() {
  const { user } = useAuth();

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
        <button>View My Tasks</button>
        <button>Create New Task</button>
        <button>Edit Profile</button>
      </div>
    </div>
  );
}

export default Dashboard;
