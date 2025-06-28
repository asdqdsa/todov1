import type { TaskType, TodoType } from "./todoTypes";
import { v4 as uuid } from "uuid";

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
