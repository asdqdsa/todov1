export function ConfirmModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90">
      <div className="bg-black p-4 text-amber-50 border border-dashed border-amber-50 rounded">
        <p>This is irreversible. Are you sure?</p>
        <div className="flex mt-5 gap-2 justify-center">
          <button
            className="border border-dashed border-amber-50 text-amber-50 px-4 py-2 cursor-pointer
                              transition-all duration-150 ease-in-out
                              hover:shadow-[0_0_2px_1px_rgba(255,191,0,0.5)]"
            onClick={onConfirm}
          >
            Yes, Archive
          </button>
          <button
            className="border border-dashed border-amber-50 text-amber-50 px-4 py-2 cursor-pointer
                              transition-all duration-150 ease-in-out
                              hover:shadow-[0_0_2px_1px_rgba(255,191,105,0.5)]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
