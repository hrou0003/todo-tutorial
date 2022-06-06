import { shuffle } from "lodash";
import { nanoid } from "nanoid";
import { useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import useLocalStorage from "./hooks/use-local-storage";
import FocusScreen from "./screens/FocusScreen";
import ListScreen from "./screens/ListScreens";
import "./styles.css";
import { Task } from "./Types";

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [focusedTaskId, setFocusedTaskId] = useState<string | undefined>(
    undefined
  );

  const addTask = (task: Pick<Task, "label">) => {
    const id = nanoid();
    setTasks((tasks) => [
      ...tasks,
      { id: id, label: task.label, isComplete: false },
    ]);
    if (!focusedTaskId) setFocusedTaskId(id);
  };

  const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, isComplete };
        return task;
      })
    );
  };

  const focusedTask = tasks.find((task) => task.id === focusedTaskId);

  const shuffleFocusedTask = () => {
    setFocusedTaskId(shuffle(tasks.filter((task) => !task.isComplete))[0]?.id);
  };

  const tasksAPI = {
    addTask,
    focusedTask,
    tasks,
    setTasks,
    shuffleFocusedTask,
    updateTaskCompletion,
  };

  return (
    <div className="App">
      <BrowserRouter>
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
          <Route path="/" element={<ListScreen {...tasksAPI} />} />
          <Route path="/focus" element={<FocusScreen {...tasksAPI} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
