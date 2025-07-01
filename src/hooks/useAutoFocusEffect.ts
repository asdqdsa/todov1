import { useEffect, useRef } from "react";

export const useAutoFocusEffect = ({ cursor }: { cursor: "end" | "start" }) => {
  const inputTextareaRef = useRef<
    HTMLInputElement | HTMLTextAreaElement | null
  >(null);
  useEffect(() => {
    const el = inputTextareaRef.current;
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      const pos = cursor === "start" ? 0 : el.value.length;
      el.focus();
      el.setSelectionRange(pos, pos);
    }
  }, [cursor]);

  return inputTextareaRef;
};
