import { useCallback, useReducer } from "react";
import { v4 as uuid } from "uuid";
import type {
  TaskStatus,
  TaskType,
  TODO_ACTIONS,
  TodoAction,
} from "../types/todoTypes";
import { todoInitialState } from "../types/constants";

const handleAddTask = (
  state: TaskType[],
  { payload }: Extract<TodoAction, { type: typeof TODO_ACTIONS.ADD_TASK }>,
): TaskType[] => [
  ...state,
  {
    id: uuid(),
    title: payload.title,
    description: payload.title,
    status: "NEW",
  },
];

const handleRemoveTask = (
  state: TaskType[],
  { payload }: Extract<TodoAction, { type: typeof TODO_ACTIONS.REMOVE_TASK }>,
): TaskType[] => [...state.filter(({ id }) => id !== payload.id)];

const handleUpdateTask = (
  state: TaskType[],
  { payload }: Extract<TodoAction, { type: typeof TODO_ACTIONS.UPDATE_TASK }>,
): TaskType[] => [
  ...state.map((task) =>
    task.id === payload.id
      ? {
          ...task,
          title: payload.title,
          description: payload.description,
        }
      : task,
  ),
];

const handleUpdateStatusTask = (
  state: TaskType[],
  {
    payload,
  }: Extract<TodoAction, { type: typeof TODO_ACTIONS.UPDATE_STATUS_TASK }>,
): TaskType[] => [
  ...state.map((task) =>
    task.id === payload.id
      ? {
          ...task,
          status: payload.status,
        }
      : task,
  ),
];

const todoReducer = (state: TaskType[], action: TodoAction): TaskType[] => {
  switch (action.type) {
    case "ADD_TASK":
      return handleAddTask(state, action);

    case "REMOVE_TASK":
      return handleRemoveTask(state, action);

    case "UPDATE_TASK":
      return handleUpdateTask(state, action);

    case "UPDATE_STATUS_TASK":
      return handleUpdateStatusTask(state, action);

    default:
      return state;
  }
};

const getTaskById = (state: TaskType[], id: string): TaskType | undefined =>
  state.find((task) => task.id === id);

const getTaskByStatus = (state: TaskType[], status: TaskStatus): TaskType[] =>
  state.filter((task) => task.status === status);

export const useTodo = () => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState);

  const findTaskById = useCallback(
    (id: string) => getTaskById(state, id),
    [state],
  );

  const findTaskByStatus = useCallback(
    (status: TaskStatus) => getTaskByStatus(state, status),
    [state],
  );

  return { state, dispatch, findTaskById, findTaskByStatus };
};
