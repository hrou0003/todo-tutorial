import { Task } from "../Types";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const FocusScreen: React.FC<Props> = ({ tasks }) => {
  const task = tasks[0];

  return <div>{task ? task.label : "No tasks"}</div>;
};

export default FocusScreen;
