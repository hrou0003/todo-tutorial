import { ChangeEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import Spacer from "../components/Spacer";
import TextButton from "../components/TextButton";
import useTaskStore from "../hooks/use-task-store";
import { Task, TasksProps } from "../Types";

const Container = styled.div`
  display: flex;
  width: 460px;
  max-width: 100%;
  flex-direction: column;
  align-items: stretch;
`;

const List = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 45px 24px;
`;

const Input = styled.input`
  background: rgba(0,0,0,0.5);
  color: white;
  border-radius: 15px;
  border: none;
  padding: 20px 24px;
`

type Props = {};

const ListScreen: React.FC<Props> = () => {
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const { addTask, tasks, setTasks, updateTaskCompletion } = useTaskStore();

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskLabel(e.target.value);

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskLabel !== "") {
      addTask({ label: newTaskLabel });
      setNewTaskLabel("");
    }
  };

  const handleCompleteChange =
    (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
      updateTaskCompletion(task.id, e.target.checked);
    };

  const handleClearClick = () => {
    setTasks((tasks) => tasks.filter((task) => !task.isComplete));
  };

  const handleTaskDeleteClick = (deletedTask: Task) => () => {
    setTasks((tasks) => tasks.filter((task) => task.id !== deletedTask.id));
  };

  console.log(tasks);

  return (
    <Container>
      <List>
        {tasks.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={handleCompleteChange(task)}
            />
            {task.label}
            <button onClick={handleTaskDeleteClick(task)}>delete</button>
          </div>
        ))}
      </List>
      <Spacer height={20} />
      <Input
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />
      <Spacer height={45} />
      <TextButton onClick={handleClearClick} style={{ alignSelf: 'center' }}>clear completed</TextButton>
    </Container>
  );
};

export default ListScreen;
