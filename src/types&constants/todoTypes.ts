import type { STATUS_LABELS, TASK_STATUSES } from "./constants";

export type StatusLabelsMap = typeof STATUS_LABELS;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};

export type TodoType = TaskType[];

export const TODO_ACTIONS = {
  SHOW_TASK_DETAILS: "SHOW_TASK_DETAILS",
  REMOVE_TASK: "REMOVE_TASK",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  UPDATE_STATUS_TASK: "UPDATE_STATUS_TASK",
} as const;

export type TodoAction =
  | { type: "REMOVE_TASK"; payload: { id: string } }
  | {
      type: "ADD_TASK";
      payload: {
        title: string;
      };
    }
  | {
      type: "UPDATE_TASK";
      payload: {
        id: string;
        title: string;
        description: string;
      };
    }
  | { type: "UPDATE_STATUS_TASK"; payload: { id: string; status: TaskStatus } }
  | { type: typeof TODO_ACTIONS.SHOW_TASK_DETAILS; payload: { id: string } };

// export type TodoAction = {
//   type: TaskActions["type"];
//   payload: TaskType;
// };

// export type TodoAction = TaskActions;
