import { useTodoCtx } from "../hooks/useTodoCtx";

type TaskProps = {
  id: string;
  title: string;
  description: string;
  // onSelect: Dispatch<SetStateAction<string | undefined>>;
  onSelect: () => void;
};
export function Task({ id, title, description, onSelect }: TaskProps) {
  const { dispatch } = useTodoCtx();
  return (
    <div
      className="border border-s-stone-200 rounded cursor-pointer"
      onClick={onSelect}
    >
      <div>
        <div>{title}</div>
        <div>{description}</div>
      </div>
      <button
        onClick={() =>
          dispatch({
            type: "REMOVE_TASK",
            payload: { id },
          })
        }
      >
        REMOVE[x]
      </button>
    </div>
  );
}
