import styled from "styled-components";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import TextButton from "../components/TextButton";
import useTaskStore from "../hooks/use-task-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

const Task = styled.div`
  align-items: center;
  flex: 1;
  display: flex;
  font-size: 32px;
  justify-content: center;
  color: white;
  padding: 45px;
`

type Props = {}

const FocusScreen: React.FC<Props> = ({ }) => {
  const { focusedTask: task, updateTaskCompletion, shuffleFocusedTask } = useTaskStore();
  const handleMarkCompleted = () => {
    if (task) updateTaskCompletion(task.id, true);
  }

  return (<Container>
      <Task>{task ? task.label : "No tasks"}</Task>
      <Button onClick={handleMarkCompleted}>Mark completed</Button>
      <Spacer height={45} />
      <TextButton onClick={shuffleFocusedTask}>nope</TextButton>
    </Container>)
    
};

export default FocusScreen;
