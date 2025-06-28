import type { TaskType } from "../types/todoTypes";

export function TaskInfo({ description, status, title }: TaskType) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>{status}</div>
    </div>
  );
}
