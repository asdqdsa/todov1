import { useState } from "react";
import { useTodoCtx } from "../hooks/useTodoCtx";
import { TaskInfo } from "./TaskInfo";
import { TaskCategory } from "./TaskCategory";

export function Todo() {
  const { dispatch, findTaskById, categorizedTasks } = useTodoCtx();
  const [input, setInput] = useState<string>("");
  const [selectedTaskId, setSelectTaskId] = useState<string | undefined>(
    undefined,
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch({ type: "ADD_TASK", payload: { title: input } });
      console.log("Task added");
      setInput("");
    }
  };

  const selectedTask = selectedTaskId
    ? findTaskById(selectedTaskId)
    : undefined;

  return (
    <div className="grid grid-cols-2 gap-4 grid-flow-col p-4">
      <div className="flex flex-col gap-4">
        <div className="flex">
          <input
            className=" border-amber-50 px-2 py-1 w-full bg-gray-950
                                focus:outline-none focus:border-transparent"
            type="text"
            placeholder="Add a Task"
            onChange={handleInputChange}
            onKeyDown={handleAddTask}
            value={input}
          />
        </div>

        <TaskCategory
          title="NEW"
          tasks={categorizedTasks.NEW}
          onSelect={setSelectTaskId}
        />
        <TaskCategory
          title="DONE"
          tasks={categorizedTasks.DONE}
          onSelect={setSelectTaskId}
        />
        <TaskCategory
          title="CURRENT"
          tasks={categorizedTasks.INPROCESS}
          onSelect={setSelectTaskId}
        />
        <TaskCategory
          title="BACKLOG"
          tasks={categorizedTasks.BACKLOG}
          onSelect={setSelectTaskId}
        />
        <TaskCategory
          title="ARCHIVED"
          tasks={categorizedTasks.ARCHIVED}
          onSelect={setSelectTaskId}
        />
      </div>
      {/* <pre>{JSON.stringify(findTaskById(selectTaskId || ""), null, 2)}</pre> */}
      {selectedTask && (
        <TaskInfo key={selectedTask.id} {...selectedTask} dispatch={dispatch} />
      )}
    </div>
  );
}
