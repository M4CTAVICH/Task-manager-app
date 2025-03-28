import { useState } from "react";
import CRcomponent from "./components/CRcomponent";
import Effectcomponents from "./components/Effectcomponents";
import Randomizer from "./components/randomizer";
import Homepage from "./pages/Homepage";
import trash from "./assets/trash.svg";
import TaskList from "./components/tasks/TaskList";
import "./App.css";

function App() {
  const [selected, setSelected] = useState("home");

  const renderContent = () => {
    switch (selected) {
      case "home":
        return <Homepage />;
      case "tasklist":
        return <TaskList />;
      case "effects":
        return <Effectcomponents />;
      case "conditional":
        return <CRcomponent />;
      case "randomizer":
        return <Randomizer />;
      default:
        return <Homepage />;
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
            Task List
          </button>
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
