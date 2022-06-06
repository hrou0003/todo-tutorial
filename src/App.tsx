import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import TaskContext from "./contexts/task-store";
import useLocalStorage from "./hooks/use-local-storage";
import FocusScreen from "./screens/FocusScreen";
import ListScreen from "./screens/ListScreens";
import { colors, GlobalStyle } from "./styles";
import "./styles.css";
import { Task } from "./Types";


const Layout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 35px;
`

const Nav = styled.nav`
  display: flex;
  margin-bottom: 45px;
`;

const TabButton = styled(NavLink)`
  width: 120px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  text-decoration: none;
  color: #fff;

  &:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  &:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  &.active {
    background: ${colors.primary};
    color: #000;
  }
`;

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  return (
      <React.Fragment>
        <Layout>
        <BrowserRouter>
          <TaskContext.Provider value={[tasks, setTasks]}>
            <Nav>
              <TabButton
                to="/"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Link
              </TabButton>
              <TabButton
                to="/focus"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Focus
              </TabButton>
            </Nav>
            <br />
            <Routes>
              <Route path="/" element={<ListScreen />} />
              <Route path="/focus" element={<FocusScreen />} />
            </Routes>
          </TaskContext.Provider>
        </BrowserRouter>
        </Layout>
        </React.Fragment>
  );
}
