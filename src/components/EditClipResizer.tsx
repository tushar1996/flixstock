import { type FC } from "react";
import { type Clip } from "../types";
import { useEditClipResizer } from "../hooks/useEditClipResizer";

type EditClipResizerProps = {
  type: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  clip: Clip;
  updateClip: (id: string, updates: Partial<Clip>) => void;
};

const ResizerClassName: Record<EditClipResizerProps["type"], string> = {
  "top-left": "top-0 left-0 cursor-nw-resize",
  "top-right": "top-0 right-0 cursor-ne-resize",
  "bottom-left": "bottom-0 left-0 cursor-sw-resize",
  "bottom-right": "bottom-0 right-0 cursor-se-resize",
};

const EditClipResizer: FC<EditClipResizerProps> = ({
  type,
  clip,
  updateClip,
}) => {
  const { handleMouseDown } = useEditClipResizer(type, clip, updateClip);

  return (
    <div
      className={`absolute w-2.5 h-2.5 bg-white border-2 ${ResizerClassName[type]}`}
      onMouseDown={handleMouseDown}
    />
  );
};

export default EditClipResizer;
