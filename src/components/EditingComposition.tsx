import { AbsoluteFill } from "remotion";
import { type FC } from "react";
import { type Clip } from "../types";
import EditClipRenderer from "./EditClipRenderer";
import { useEditingComposition } from "../hooks/useEditingComposition";

type EditingCompositionProps = {
  clips: Clip[];
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>;
};

const EditingComposition: FC<EditingCompositionProps> = ({
  clips,
  setClips,
}) => {
  const { updateClip } = useEditingComposition(setClips);

  return (
    <AbsoluteFill className="bg-black">
      <div className="relative w-full h-full">
        {clips.map((clip) => (
          <EditClipRenderer key={clip.id} clip={clip} updateClip={updateClip} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default EditingComposition;
