import { ClipType, AspectRatio, Option } from "./types";

export const SCALE = 0.2;
export const TRACK_HEIGHT = 60;
export const FPS = 30;
export const TypeVsColor: Record<ClipType, string> = {
  image: "#4f46e5",
  video: "#16a34a",
  audio: "#fcb103",
};

export const AspectRatioVsDimensions: Record<
  AspectRatio,
  { width: number; height: number }
> = {
  "9:16": { width: 180, height: 320 },
  "16:9": { width: 320, height: 180 },
};

export const AspectRatiosOptions: Option<AspectRatio>[] = [
  {
    label: "Vertical (9:16)",
    value: "9:16",
  },
  {
    label: "Horizontal (16:9)",
    value: "16:9",
  },
];
