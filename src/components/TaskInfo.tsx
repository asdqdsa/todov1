import { useState, type RefObject } from "react";
import type {
  TaskStatus,
  TaskType,
  TodoAction,
} from "../types&constants/todoTypes";
import { STATUS_LABELS, STATUS_TRANSITION } from "../types&constants/constants";
import { ConfirmModal } from "./ConfrimModal";
import { useAutoFocusEffect } from "../hooks/useAutoFocusEffect";

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
  const [taskDescription, setTaskDescription] = useState<string>(description);
  const textareaRef = useAutoFocusEffect({
    cursor: "end",
  }) as RefObject<HTMLTextAreaElement>;

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

  return (
    <div className="flex flex-col border border-dashed border-amber-50  px-4 py-2">
      <div className="flex justify-between">
        <h2>{title}</h2>
        {/* <div>{STATUS_LABELS[taskLabel]}</div> */}
        <div className="flex flex-row-reverse justify-between">
          {status !== "ARCHIVED" && (
            <label htmlFor="task-status">
              <select
                className="bg-black text-amber-50 focus:outline-none text-end px-2 cursor-pointer"
                id="task-status"
                value={"default"}
                onChange={handleStatusChange}
              >
                <option disabled value={"default"}>
                  {STATUS_LABELS[taskLabel]}
                </option>
                {allowedStatuses.map((allowedLabel) => (
                  <option
                    className="bg-transparent"
                    key={allowedLabel}
                    value={allowedLabel}
                  >
                    {STATUS_LABELS[allowedLabel]}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>
      {/* <p>{description}</p> */}
      <textarea
        ref={textareaRef}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="px-2 py-1 mb-2 w-full h-full
        transition-all duration:100 hover:ease-out focus:bg-gray-950 focus:outline-none focus:border-transparent"
        onBlur={() => {
          dispatch({
            type: "UPDATE_TASK",
            payload: { id, title, description: taskDescription },
          });
        }}
      />
      {confirmArchive && (
        <ConfirmModal
          onClose={handleArchiveCancel}
          onConfirm={handleArchiveConfirm}
        />
      )}
    </div>
  );
}
