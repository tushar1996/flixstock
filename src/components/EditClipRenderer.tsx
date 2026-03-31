import { type FC } from "react";
import { Img } from "remotion";
import { type Clip } from "../types";
import EditClipResizer from "./EditClipResizer";
import { useEditClipRenderer } from "../hooks/useEditClipRenderer";

type EditClipRendererProps = {
  clip: Clip;
  updateClip: (id: string, updates: Partial<Clip>) => void;
};

const EditClipRenderer: FC<EditClipRendererProps> = ({ clip, updateClip }) => {
  const { attributes, listeners, setNodeRef, style } =
    useEditClipRenderer(clip);

  if (clip.type === "audio") return null;

  return (
    <div ref={setNodeRef} style={style} className="flex select-none">
      <div {...listeners} {...attributes} className="flex-1">
        {clip.type === "image" && (
          <Img
            src={clip.src}
            className="w-full h-full object-cover pointer-events-none"
          />
        )}

        {clip.type === "video" && (
          <video
            src={clip.src}
            className="w-full h-full object-cover pointer-events-none"
          />
        )}
      </div>
      <EditClipResizer updateClip={updateClip} type="top-left" clip={clip} />
      <EditClipResizer updateClip={updateClip} type="top-right" clip={clip} />
      <EditClipResizer updateClip={updateClip} type="bottom-left" clip={clip} />
      <EditClipResizer
        updateClip={updateClip}
        type="bottom-right"
        clip={clip}
      />
    </div>
  );
};

export default EditClipRenderer;
