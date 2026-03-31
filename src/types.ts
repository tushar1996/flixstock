export type ClipType = "image" | "video" | "audio";
export type AspectRatio = "9:16" | "16:9";

export type Clip = {
  id: string;
  type: ClipType;
  src: string;
  start: number; // frame
  duration: number; // frames
  x: number; // %
  y: number; // %
  width: number; // %
  height: number; // %
  zIndex: number; // layering

  track: number;
  name: string;
};

export type Option<T> = {
  label: string;
  value: T;
};
