import type { TaskType } from "../types/todoTypes";
import { Task } from "./Task";

export function TaskCategory({
  title,
  tasks,
  onSelect,
}: {
  title: string;
  tasks: TaskType[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Task key={task.id} {...task} onSelect={() => onSelect(task.id)} />
      ))}
    </div>
  );
}
