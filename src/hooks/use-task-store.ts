import { shuffle } from "lodash";
import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import TaskContext from "../contexts/task-store";
import { Task } from "../Types";
import useLocalStorage from "./use-local-storage";

const useTaskStore = () => {
  const [tasks, setTasks] = useContext(TaskContext);
  const [focusedTaskId, setFocusedTaskId] = useState<string | undefined>(
    undefined
  );

  const addTask = (task: Pick<Task, "label">) => {
    const id = nanoid();
    setTasks((tasks) => [
      ...tasks,
      { id: id, label: task.label, isComplete: false },
    ]);
    if (!focusedTaskId) setFocusedTaskId(id);
  };

  const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, isComplete };
        return task;
      })
    );
  };

  const focusedTask = tasks.find((task) => task.id === focusedTaskId);

  const shuffleFocusedTask = () => {
    setFocusedTaskId(shuffle(tasks.filter((task) => !task.isComplete))[0]?.id);
  };

  const tasksAPI = {
    addTask,
    focusedTask,
    tasks,
    setTasks,
    shuffleFocusedTask,
    updateTaskCompletion,
  };

  return tasksAPI;
};

export default useTaskStore;
