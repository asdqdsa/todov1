import { useEffect, useState } from "react";
import type {
  TaskStatus,
  TaskType,
  TodoAction,
} from "../types&constants/todoTypes";
import { STATUS_LABELS, STATUS_TRANSITION } from "../types&constants/constants";
import { ConfirmModal } from "./ConfrimModal";

export function TaskInfo({
  description,
  status,
  title,
  id,
  dispatch,
}: TaskType & {
  dispatch: React.Dispatch<TodoAction>;
}) {
  const [taskLabel, setTaskLabel] = useState<TaskStatus>(status);
  const [confirmArchive, setConfirmArchive] = useState<boolean>(false);
  const [pendingArchive, setPendingArchive] = useState<TaskStatus | undefined>(
    undefined,
  );

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus;
    if (newStatus === "ARCHIVED") {
      setConfirmArchive(true);
      setPendingArchive(newStatus);
    } else {
      setTaskLabel(newStatus);
      dispatch({
        type: "UPDATE_STATUS_TASK",
        payload: {
          id: id,
          status: newStatus,
        },
      });
    }
  };

  const handleArchiveConfirm = () => {
    dispatch({
      type: "UPDATE_STATUS_TASK",
      payload: {
        id: id,
        status: "ARCHIVED",
      },
    });
    setConfirmArchive(false);
    setPendingArchive(undefined);
  };

  const handleArchiveCancel = () => {
    setConfirmArchive(false);
    setPendingArchive(undefined);
  };

  const allowedStatuses = STATUS_TRANSITION[taskLabel];

  useEffect(() => {
    setTaskLabel(status);
  }, [status]);

  return (
    <div className="flex flex-col border border-dashed border-amber-50  px-4 py-2">
      <h2>{title}</h2>
      <p>{description}</p>
      <div>status: {STATUS_LABELS[taskLabel]}</div>
      {status !== "ARCHIVED" && (
        <label htmlFor="task-status">
          move_to:
          <select
            className="bg-black text-amber-50 focus:outline-none"
            id="task-status"
            value={taskLabel}
            onChange={handleStatusChange}
          >
            {allowedStatuses.map((allowedLabel) => (
              <option
                className="bg-transparent "
                key={allowedLabel}
                value={allowedLabel}
              >
                {STATUS_LABELS[allowedLabel]}
              </option>
            ))}
          </select>
        </label>
      )}
      {confirmArchive && (
        <ConfirmModal
          onClose={handleArchiveCancel}
          onConfirm={handleArchiveConfirm}
        />
      )}
    </div>
  );
}
