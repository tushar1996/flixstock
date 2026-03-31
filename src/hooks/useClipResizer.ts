import { SCALE } from "../constants";

export const useClipResizer = (onResize: (frameDelta: number) => void) => {
  const handleResize = (e: React.MouseEvent) => {
    e.stopPropagation();

    const startX = e.clientX;

    const onMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const pendingDelta = Math.round(dx / SCALE);
      onResize(pendingDelta);
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return {
    handleResize,
  };
};
