import { type Clip } from "../types";

export const usePlayableComposition = (clips: Clip[]) => {
  const getClipStyle = (clip: Clip) => ({
    left: `${clip.x ?? 0}%`,
    top: `${clip.y ?? 0}%`,
    width: `${clip.width ?? 100}%`,
    height: `${clip.height ?? 100}%`,
    zIndex: clip.zIndex ?? 0,
  });

  return {
    clips,
    getClipStyle,
  };
};
