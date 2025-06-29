import { useEffect, useState } from "react";
import type {
  StatusLabelsMap,
  TaskStatus,
  TaskType,
  TodoAction,
} from "../types/todoTypes";

export function TaskInfo({
  description,
  status,
  title,
  id,
  labels,
  dispatch,
}: TaskType & {
  dispatch: React.Dispatch<TodoAction>;
  labels: StatusLabelsMap;
}) {
  const [taskLabel, setTaskLabel] = useState<TaskStatus>(status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus;
    setTaskLabel(newStatus);
    dispatch({
      type: "UPDATE_STATUS_TASK",
      payload: {
        id: id,
        status: newStatus,
      },
    });
  };

  useEffect(() => {
    setTaskLabel(status);
  }, [status]);

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>{labels[taskLabel]}</div>
      <label htmlFor="task-status">
        <select
          className="bg-black text-amber-50"
          id="task-status"
          value={taskLabel}
          onChange={handleStatusChange}
        >
          {Object.entries(labels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
