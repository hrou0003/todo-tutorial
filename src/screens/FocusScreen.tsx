import { Task, TasksProps } from "../Types";

type Props = TasksProps & {}

const FocusScreen: React.FC<Props> = ({ focusedTask: task, updateTaskCompletion, shuffleFocusedTask }) => {

  const handleMarkCompleted = () => {
    if (task) updateTaskCompletion(task.id, true);
  }

  return task ? (<div>
      <div>{task ? task.label : "No tasks"}</div>
      <button onClick={handleMarkCompleted}>mark completed</button>
      <button onClick={shuffleFocusedTask}>nope</button>
    </div>) : (
      <div>No incomplete tasks. Yay!</div>
    )
};

export default FocusScreen;
