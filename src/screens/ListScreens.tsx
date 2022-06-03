import { KeyboardEvent, ChangeEvent, useState } from "react";
import { nanoid } from "nanoid";

type Props = {};

type Task = {
  id: string;
  label: string;
};

const ListScreen: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskLabel(e.target.value);

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskLabel !== "") {
      setTasks((prev) => [...prev, { id: nanoid(), label: newTaskLabel }]);
      setNewTaskLabel("");
    }
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.label}</li>
        ))}
      </ul>
      <input
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />
    </div>
  );
};

export default ListScreen;
