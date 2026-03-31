import type { FC } from "react";
import type { PlayerRef } from "@remotion/player";
import { usePlayPauseButton } from "../hooks/usePlayPauseButton";

type PlayPauseButtonProps = {
  playerRef: React.RefObject<PlayerRef | null>;
};

export const PlayPauseButton: FC<PlayPauseButtonProps> = ({ playerRef }) => {
  const { onToggle, playing } = usePlayPauseButton(playerRef);

  return (
    <button
      onClick={onToggle}
      className="p-2 border rounded cursor-pointer bg-black text-white hover:bg-gray-500"
    >
      {playing ? "Pause" : "Play"}
    </button>
  );
};
