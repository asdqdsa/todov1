import { TodoProvider } from "../hooks/TodoProvider";
import { Todo } from "./Todo";

function App() {
  return (
    <TodoProvider>
      <div className="bg-black">
        <div className="bg-black text-amber-50 w-screen h-screen container mx-auto">
          <Todo />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
