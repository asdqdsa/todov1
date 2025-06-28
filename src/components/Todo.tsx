import { useState } from "react";
import { Task } from "./Task";
import { useTodoCtx } from "../hooks/useTodoCtx";
import { TaskInfo } from "./TaskInfo";
import { TaskCategory } from "./TaskCategory";

export function Todo() {
  const { state, dispatch, findTaskById, findTaskByStatus } = useTodoCtx();
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

  const newTasks = findTaskByStatus("NEW");
  const currentTasks = findTaskByStatus("INPROCESS");
  const doneTasks = findTaskByStatus("DONE");
  const postponedTasks = findTaskByStatus("BACKLOG");
  const deletedTasks = findTaskByStatus("ARCHIVED");

  return (
    <div className="grid grid-cols-2 gap-4 grid-flow-col">
      <div className="flex flex-col gap-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Add a Task"
            onChange={handleInputChange}
            onKeyDown={handleAddTask}
            value={input}
          />
        </div>

        <TaskCategory title="NEW" tasks={newTasks} onSelect={setSelectTaskId} />
        <TaskCategory
          title="DONE"
          tasks={doneTasks}
          onSelect={setSelectTaskId}
        />
        <TaskCategory
          title="CURRENT"
          tasks={currentTasks}
          onSelect={setSelectTaskId}
        />
        <TaskCategory
          title="BACKLOG"
          tasks={postponedTasks}
          onSelect={setSelectTaskId}
        />
        <TaskCategory
          title="ARCHIVED"
          tasks={deletedTasks}
          onSelect={setSelectTaskId}
        />
      </div>
      {/* <pre>{JSON.stringify(findTaskById(selectTaskId || ""), null, 2)}</pre> */}
      {selectedTask && <TaskInfo {...selectedTask} />}
    </div>
  );
}
