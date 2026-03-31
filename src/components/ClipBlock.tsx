import type { FC } from "react";
import { type Clip } from "../types";
import ClipResizer from "./ClipResizer";
import { useClipBlock } from "../hooks/useClipBlock";

type ClipBlockProps = {
  clip: Clip;
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>;
};

const ClipBlock: FC<ClipBlockProps> = ({ clip, setClips }) => {
  const {
    attributes,
    handleDelete,
    isDragging,
    listeners,
    onLeftResize,
    onRightResize,
    setNodeRef,
    style,
  } = useClipBlock(clip, setClips);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="absolute flex items-center h-15 group"
    >
      <ClipResizer onResize={onLeftResize} />
      <div
        className={`flex-1 text-white p-2 truncate ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        {...listeners}
        {...attributes}
      >
        <span>{clip.name}</span>
      </div>

      <ClipResizer onResize={onRightResize} />

      <button
        className="bg-red-400 cursor-pointer text-center invisible group-hover:visible absolute top-5.5 right-3 rounded-full text-xs w-4 h-4 z-50"
        onClick={handleDelete}
        onPointerDown={(e) => e.preventDefault()}
      >
        X
      </button>
    </div>
  );
};

export default ClipBlock;
