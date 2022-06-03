import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListScreen from "./screens/ListScreens";

export default function App() {
  return (
    <div className="App">
      <ListScreen />
    </div>
  );
}
