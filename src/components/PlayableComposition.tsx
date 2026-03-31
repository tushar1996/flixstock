import {
  AbsoluteFill,
  Html5Audio,
  Img,
  OffthreadVideo,
  Sequence,
} from "remotion";
import { type FC } from "react";
import { FPS } from "../constants";
import { type Clip } from "../types";
import { usePlayableComposition } from "../hooks/usePlayableComposition";

type CustomCompositionProps = { clips: Clip[] };

const CustomComposition: FC<CustomCompositionProps> = ({ clips }) => {
  const { getClipStyle } = usePlayableComposition(clips);

  return (
    <AbsoluteFill className="bg-black">
      {clips.map((clip) => (
        <Sequence
          key={clip.id}
          from={clip.start}
          durationInFrames={clip.duration}
          premountFor={FPS}
        >
          <div className="absolute" style={getClipStyle(clip)}>
            {clip.type === "image" && (
              <Img src={clip.src} className="w-full h-full object-cover" />
            )}

            {clip.type === "video" && (
              <OffthreadVideo
                src={clip.src}
                className="w-full h-full object-cover"
              />
            )}

            {clip.type === "audio" && <Html5Audio src={clip.src} />}
          </div>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export default CustomComposition;
