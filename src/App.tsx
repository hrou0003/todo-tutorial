import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import TaskContext from "./contexts/task-store";
import useLocalStorage from "./hooks/use-local-storage";
import useTaskStore from "./hooks/use-task-store";
import FocusScreen from "./screens/FocusScreen";
import ListScreen from "./screens/ListScreens";
import "./styles.css";
import { Task } from "./Types";

export default function App() {

  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  return (
    <div className="App">
      <BrowserRouter>
        <TaskContext.Provider value={[tasks, setTasks]}>
          <nav>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? { fontWeight: "bold" } : {})}
            >
              Link
            </NavLink>
            {" - "}
            <NavLink
              to="/focus"
              style={({ isActive }) => (isActive ? { fontWeight: "bold" } : {})}
            >
              Focus
            </NavLink>
          </nav>
          <br />
          <Routes>
            <Route path="/" element={<ListScreen />} />
            <Route path="/focus" element={<FocusScreen />} />
          </Routes>
        </TaskContext.Provider>
      </BrowserRouter>
    </div>
  );
}
