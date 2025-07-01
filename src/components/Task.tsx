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
      className="flex flex-col border border-dashed border-amber-50 text-amber-50 px-4 py-2 cursor-pointer
                               transition-all duration-150 ease-in-out
                               hover:border-solid"
      onClick={onSelect}
    >
      <div>
        <div>{title}</div>
        <div>{description}</div>
      </div>
      <div className="flex justify-end">
        <button
          className="flex group"
          onClick={() =>
            dispatch({
              type: "REMOVE_TASK",
              payload: { id },
            })
          }
        >
          <span className="transition-transform  duration-150 group-hover:translate-x-2">
            {">"}
          </span>
          <span className="transition-transform cursor-pointer group-hover:translate-y-[0px]">
            &nbsp;REMOVE&nbsp;
          </span>
          <span className="transition-transform duration-150 group-hover:-translate-x-2">
            {/* {"<"} */}
          </span>
        </button>
      </div>
    </div>
  );
}
