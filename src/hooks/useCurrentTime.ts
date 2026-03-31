import { FPS } from "../constants";
import { formatTime } from "../utils";
import { useCurrentPlayerFrame } from "./useCurrentPlayerFrame";

export const useCurrentTime = (
  playerRef: React.RefObject<import("@remotion/player").PlayerRef | null>,
) => {
  const frame = useCurrentPlayerFrame(playerRef);

  return {
    currentTimeLabel: formatTime(frame, FPS),
  };
};
