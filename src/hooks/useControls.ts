import { FPS } from "../constants";
import { formatTime } from "../utils";

export const useControls = (durationInFrames: number) => {
  return {
    durationLabel: formatTime(durationInFrames, FPS),
  };
};
