import { useTodo } from "./useTodo";
import { TodoContext } from "./useTodoCtx";

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const { state, dispatch, findTaskById, findTaskByStatus } = useTodo();
  return (
    <TodoContext value={{ state, dispatch, findTaskById, findTaskByStatus }}>
      {children}
    </TodoContext>
  );
}
