import type { TaskStatus, TaskType, TodoType } from "./todoTypes";
import { v4 as uuid } from "uuid";

export const TASK_STATUSES = [
  "INPROCESS",
  "DONE",
  "NEW",
  "BACKLOG",
  "ARCHIVED",
] as const;

export const STATUS_LABELS: Record<TaskStatus, string> = {
  INPROCESS: "In Process",
  DONE: "Done",
  NEW: "New",
  BACKLOG: "Backlog",
  ARCHIVED: "Archived",
};

export const STATUS_TRANSITION: Record<TaskStatus, TaskStatus[]> = {
  NEW: ["INPROCESS", "DONE", "BACKLOG", "ARCHIVED"],
  INPROCESS: ["DONE", "BACKLOG", "ARCHIVED"],
  DONE: ["ARCHIVED", "INPROCESS"],
  BACKLOG: ["NEW", "INPROCESS"],
  ARCHIVED: [],
};

export const dummyTask: TaskType = {
  id: "",
  title: "",
  description: "",
  status: "NEW",
};

export const todoInitialState: TodoType = [
  {
    id: uuid(),
    title: "Test Todo",
    description: "Test Description",
    status: "NEW",
  },
  {
    id: uuid(),
    title: "Test Todo DONE",
    description: "Test Description",
    status: "DONE",
  },
];
