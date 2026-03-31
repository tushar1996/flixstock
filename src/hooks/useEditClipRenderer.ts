import { useDraggable } from "@dnd-kit/core";
import { type Clip } from "../types";

export const useEditClipRenderer = (clip: Clip) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `canvas-${clip.id}`,
  });

  const style = {
    position: "absolute" as const,
    left: `${clip.x}%`,
    top: `${clip.y}%`,
    width: `${clip.width}%`,
    height: `${clip.height}%`,
    zIndex: clip.track,
    border: "2px solid #3b82f6",
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return {
    attributes,
    listeners,
    setNodeRef,
    style,
  };
};
