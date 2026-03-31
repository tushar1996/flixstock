import { AbsoluteFill, Sequence } from "remotion";
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
  const { durationInFrames, updateClip } = useEditingComposition(clips, setClips);

  return (
    <AbsoluteFill className="bg-black">
      <Sequence from={0} durationInFrames={durationInFrames}>
        <div className="relative w-full h-full">
          {clips.map((clip) => (
            <EditClipRenderer
              key={clip.id}
              clip={clip}
              updateClip={updateClip}
            />
          ))}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export default EditingComposition;
