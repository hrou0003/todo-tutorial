import { ChangeEvent, KeyboardEvent, useState } from "react";
import useTaskStore from "../hooks/use-task-store";
import { Task, TasksProps } from "../Types";

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
    <div>
      <div>
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
      </div>
      <input
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />

      <div>
        <button onClick={handleClearClick}>clear completed</button>
      </div>
    </div>
  );
};

export default ListScreen;
