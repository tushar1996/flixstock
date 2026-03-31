import type { FC } from "react";
import type { PlayerRef } from "@remotion/player";
import { usePlayhead } from "../hooks/usePlayhead";

type PlayheadProps = {
  playerRef: React.RefObject<PlayerRef | null>;
};

const Playhead: FC<PlayheadProps> = ({ playerRef }) => {
  const { style } = usePlayhead(playerRef);

  return <div style={style} className="absolute w-0.5 h-full bg-red-500 z-1" />;
};

export default Playhead;
