import { SCALE } from "../constants";
import { useCurrentPlayerFrame } from "./useCurrentPlayerFrame";

export const usePlayhead = (
  playerRef: React.RefObject<import("@remotion/player").PlayerRef | null>,
) => {
  const frame = useCurrentPlayerFrame(playerRef);

  return {
    style: {
      left: frame * SCALE,
    },
  };
};
