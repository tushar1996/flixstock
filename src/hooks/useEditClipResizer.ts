import type { MouseEventHandler } from "react";
import { type Clip } from "../types";

export const useEditClipResizer = (
  type: "top-left" | "top-right" | "bottom-left" | "bottom-right",
  clip: Clip,
  updateClip: (id: string, updates: Partial<Clip>) => void,
) => {
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;

    const parent = (e.target as HTMLElement).closest(".player-root");
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const startW = clip.width;
    const startH = clip.height;
    const isLeft = type === "top-left" || type === "bottom-left";
    const isTop = type === "top-left" || type === "top-right";

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      const deltaX = isLeft ? -dx : dx;
      const deltaY = isTop ? -dy : dy;

      updateClip(clip.id, {
        width: Math.max(5, startW + (deltaX / rect.width) * 100),
        height: Math.max(5, startH + (deltaY / rect.height) * 100),
      });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return {
    handleMouseDown,
  };
};
