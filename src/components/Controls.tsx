import { type PlayerRef } from "@remotion/player";
import { type FC } from "react";
import { PlayPauseButton } from "./PlayPauseButton";
import CurrentTime from "./CurrentTime";
import { useControls } from "../hooks/useControls";

type ControlsProps = {
  playerRef: React.RefObject<PlayerRef | null>;
  durationInFrames: number;
};

const Controls: FC<ControlsProps> = ({ playerRef, durationInFrames }) => {
  const { durationLabel } = useControls(durationInFrames);

  return (
    <div className="flex items-center w-45 justify-between border p-2">
      <CurrentTime playerRef={playerRef} />
      <PlayPauseButton playerRef={playerRef} />
      <span>{durationLabel}</span>
    </div>
  );
};

export default Controls;
