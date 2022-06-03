import {
  KeyboardEvent,
  ChangeEvent,
  useState,
  ChangeEventHandler
} from "react";

import { Task } from "../Types";
import { nanoid } from "nanoid";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const ListScreen: React.FC<Props> = ({ tasks, setTasks }) => {
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskLabel(e.target.value);

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskLabel !== "") {
      setTasks((prev) => [
        ...prev,
        { id: nanoid(), label: newTaskLabel, isComplete: false }
      ]);
      setNewTaskLabel("");
    }
  };

  const handleCompleteChange = (handledTask: Task) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === handledTask.id)
          return { ...task, isComplete: e.target.checked };
        return task;
      })
    );
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
