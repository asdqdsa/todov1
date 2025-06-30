import { createContext, useContext } from "react";
import type {
  TaskStatus,
  TaskType,
  TodoAction,
} from "../types&constants/todoTypes";

interface ITodoContext {
  state: {
    id: string;
    title: string;
    description: string;
  }[];
  dispatch: React.Dispatch<TodoAction>;
  findTaskById: (id: string) => TaskType | undefined;
  categorizedTasks: Record<TaskStatus, TaskType[]>;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const useTodoCtx = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be used within a TodoProvider");
  return ctx;
};
