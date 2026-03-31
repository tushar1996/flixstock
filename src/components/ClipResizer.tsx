import { type FC } from "react";
import { useClipResizer } from "../hooks/useClipResizer";

type ClipResizerProps = {
  onResize: (frameDelta: number) => void;
};

const ClipResizer: FC<ClipResizerProps> = ({ onResize }) => {
  const { handleResize } = useClipResizer(onResize);

  return (
    <div
      onMouseDown={handleResize}
      className="h-full w-3 cursor-ew-resize bg-white border"
    />
  );
};

export default ClipResizer;
