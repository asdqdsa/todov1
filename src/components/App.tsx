import { TodoProvider } from "../hooks/TodoProvider";
import { Todo } from "./Todo";

function App() {
  return (
    <TodoProvider>
      <div className="bg-black">
        <div className="font-mono bg-black text-amber-50 w-screen h-screen container mx-auto pt-4 selection:text-black selection:bg-amber-50">
          <Todo />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
