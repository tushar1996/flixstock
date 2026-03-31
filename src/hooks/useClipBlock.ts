import { useDraggable } from "@dnd-kit/core";
import type { CSSProperties, MouseEventHandler } from "react";
import { SCALE, TypeVsColor } from "../constants";
import { type Clip } from "../types";

export const useClipBlock = (
  clip: Clip,
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>,
) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: clip.id,
    });

  const updateClip = (updates: Partial<Clip>) => {
    setClips((prev) =>
      prev.map((c) => (c.id === clip.id ? { ...c, ...updates } : c)),
    );
  };

  const onLeftResize = (frameDelta: number) => {
    const newStart = Math.max(0, clip.start + frameDelta);
    const newDuration = Math.max(10, clip.duration - frameDelta);

    if (newStart >= clip.start + clip.duration - 10) return;

    updateClip({ start: newStart, duration: newDuration });
  };

  const onRightResize = (frameDelta: number) => {
    const newDuration = Math.max(10, clip.duration + frameDelta);

    updateClip({ duration: newDuration });
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setClips((prev) => prev.filter((x) => x.id !== clip.id));
  };

  const style: CSSProperties = {
    left: clip.start * SCALE,
    width: clip.duration * SCALE,
    background: TypeVsColor[clip.type],
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return {
    attributes,
    handleDelete,
    isDragging,
    listeners,
    onLeftResize,
    onRightResize,
    setNodeRef,
    style,
  };
};
