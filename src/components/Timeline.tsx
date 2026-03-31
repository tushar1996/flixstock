import { DndContext } from "@dnd-kit/core";
import { type PlayerRef } from "@remotion/player";
import { type FC } from "react";
import { type Clip } from "../types";
import ClipBlock from "./ClipBlock";
import Playhead from "./Playhead";
import { useTimeline } from "../hooks/useTimeline";

type TimelineProps = {
  clips: Clip[];
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>;
  playerRef: React.RefObject<PlayerRef | null>;
};

const Timeline: FC<TimelineProps> = ({ clips, setClips, playerRef }) => {
  const {
    tracks,
    handleDragEnd,
    handleDragStart,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
  } = useTimeline(clips, setClips, playerRef);

  return (
    <div
      className="relative bg-black px-3 overflow-auto"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <Playhead playerRef={playerRef} />

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {Object.entries(tracks).map(([trackIndex, trackClips]) => (
          <div key={trackIndex} className="relative h-15 border-b">
            {trackClips.map((clip) => (
              <ClipBlock key={clip.id} clip={clip} setClips={setClips} />
            ))}
          </div>
        ))}
      </DndContext>
    </div>
  );
};

export default Timeline;
