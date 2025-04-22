import { useState } from "react";
import CRcomponent from "./components/CRcomponent";
import Effectcomponents from "./components/Effectcomponents";
import Randomizer from "./components/randomizer";
import Homepage from "./pages/Homepage";
import trash from "./assets/trash.svg";
import TaskList from "./components/tasks/TaskList";
import UsersList from "./components/Users/UsersList";
import Aboutpage from "./pages/Aboutpage";
import Login from "./components/LOGIN";
import Register from "./components/Register";
import Dashboard from "./components/dashboard";
import AuthProvider from "./components/AuthProvider";
import { useAuth } from "./context/authContext";
import "./App.css";

function AppContent() {
  const [selected, setSelected] = useState("login");
  const [navParams, setNavParams] = useState({});
  const { user, logout, loading } = useAuth();

  const handleNavigation = (destination, params) => {
    setSelected(destination);
    setNavParams(params);
  };
  const handleLoginSuccess = (userData) => {
    console.log("Login successful:", userData.name);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="auth-container">
        {selected === "login" ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Register onRegisterSuccess={() => setSelected("login")} />
        )}
        <div className="auth-toggle">
          <button
            onClick={() => setSelected("login")}
            className={selected === "login" ? "active" : ""}
          >
            Login
          </button>
          <button
            onClick={() => setSelected("register")}
            className={selected === "register" ? "active" : ""}
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  const handleHomePageNavigation = (destination) => {
    setSelected(destination);
  };

  const renderContent = () => {
    switch (selected) {
      case "home":
        return <Homepage onNavigate={handleHomePageNavigation} />;
      case "tasklist":
        return <TaskList userId={navParams.userId} />;
      case "Users":
        return <UsersList />;
      case "about":
        return <Aboutpage />;
      case "randomizer":
        return <Randomizer />;
      case "dashboard":
        return <Dashboard onNavigate={handleNavigation} />;
      default:
        return <Homepage onNavigate={handleHomePageNavigation} />;
    }
  };

  return (
    <div className="App">
      <nav className="nav-bar">
        <div className="nav-brand">
          <img src={trash} alt="Task Manager Logo" className="logo" />
          <h1>Task Manager</h1>
        </div>
        <div className="nav-links">
          <button
            onClick={() => setSelected("home")}
            className={selected === "home" ? "active" : ""}
          >
            Home
          </button>
          <button
            onClick={() => setSelected("dashboard")}
            className={selected === "dashboard" ? "active" : ""}
          >
            Dashboard
          </button>
          <button
            onClick={() => setSelected("tasklist")}
            className={selected === "tasklist" ? "active" : ""}
          >
            Tasks
          </button>
          <button
            onClick={() => setSelected("Users")}
            className={selected === "Users" ? "active" : ""}
          >
            Users
          </button>
          <button
            onClick={() => setSelected("randomizer")}
            className={selected === "randomizer" ? "active" : ""}
          >
            Randomizer
          </button>
          <button onClick={logout} className="logout">
            Logout
          </button>
        </div>
      </nav>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
