import { useState } from "react";
import CRcomponent from "./components/CRcomponent";
import Effectcomponents from "./components/Effectcomponents";
import Randomizer from "./components/randomizer";
import Homepage from "./pages/Homepage";
import trash from "./assets/trash.svg";
import TaskList from "./components/tasks/TaskList";
import UsersList from "./components/Users/UsersList";
import Aboutpage from "./pages/Aboutpage";
import "./App.css";

function App() {
  const [selected, setSelected] = useState("home");

  // Function to handle navigation from Homepage
  const handleHomePageNavigation = (destination) => {
    setSelected(destination);
  };

  const renderContent = () => {
    switch (selected) {
      case "home":
        return <Homepage onNavigate={handleHomePageNavigation} />;
      case "tasklist":
        return <TaskList />;
      case "Users":
        return <UsersList />;
      case "about":
        return <Aboutpage />;
      case "effects":
        return <Effectcomponents />;
      case "conditional":
        return <CRcomponent />;
      case "randomizer":
        return <Randomizer />;
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
          {/* <button
            onClick={() => setSelected("about")}
            className={selected === "about" ? "active" : ""}
          >
            About
          </button> */}
          <button
            onClick={() => setSelected("effects")}
            className={selected === "effects" ? "active" : ""}
          >
            Effects
          </button>
          <button
            onClick={() => setSelected("conditional")}
            className={selected === "conditional" ? "active" : ""}
          >
            Conditional
          </button>
          <button
            onClick={() => setSelected("randomizer")}
            className={selected === "randomizer" ? "active" : ""}
          >
            Randomizer
          </button>
        </div>
      </nav>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default App;
