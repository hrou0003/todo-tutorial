import { ChangeEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import Checkbox from "../components/Checkbox";
import IconButton from "../components/IconButton";
import Spacer from "../components/Spacer";
import TextButton from "../components/TextButton";
import useTaskStore from "../hooks/use-task-store";
import DeleteIcon from "../icons/DeleteIcon";
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
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 15px;
  border: none;
  padding: 20px 24px;
`;


const ListItem = styled.label`
  display: flex;
  align-items: center;
  padding: 4px 0;
  color: white;
  font-size: 18px;
`;

const DeleteButton = styled(IconButton)`
  visibility: hidden;

  ${ListItem}:hover & {
    visibility: visible;
  }
`;

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
            <ListItem>
              <Checkbox
                checked={task.isComplete} 
                onChange={handleCompleteChange(task)}
              /> 
              <Spacer width={24}/>
              {task.label}
              <Spacer flex={1} />
            <DeleteButton showOnHover onClick={handleTaskDeleteClick(task)}>
              <DeleteIcon />
            </DeleteButton>
            </ListItem>
          </div>
        ))}
      </List>
      <Spacer height={20} />
      <Input
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
        placeholder="Add new task"
      />
      <Spacer height={45} />
      <TextButton onClick={handleClearClick} style={{ alignSelf: "center" }}>
        clear completed
      </TextButton>
    </Container>
  );
};

export default ListScreen;
