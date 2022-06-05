import "./styles.css";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import ListScreen from "./screens/ListScreens";
import FocusScreen from "./screens/FocusScreen";
import { useState } from "react";
import { Task } from "./Types";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const tasksProps = { tasks, setTasks };



  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <NavLink
            to="/"
            style={({ isActive }) => 
              isActive ? {fontWeight: "bold"} : {}
          }
          >
            Link
          </NavLink>
          {" - "}
          <NavLink
            to="/focus"
             style={({ isActive }) => 
              isActive ? {fontWeight: "bold"} : {}
          }
          >
            Focus
          </NavLink>
        </nav>
        <br />
        <Routes>
          <Route path="/" element={<ListScreen {...tasksProps} />} />
          <Route path="/focus" element={<FocusScreen {...tasksProps} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
