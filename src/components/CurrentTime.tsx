import { type PlayerRef } from "@remotion/player";
import { type FC } from "react";
import { useCurrentTime } from "../hooks/useCurrentTime";

type CurrentTimeProps = {
  playerRef: React.RefObject<PlayerRef | null>;
};

const CurrentTime: FC<CurrentTimeProps> = ({ playerRef }) => {
  const { currentTimeLabel } = useCurrentTime(playerRef);

  return <span>{currentTimeLabel}</span>;
};

export default CurrentTime;
