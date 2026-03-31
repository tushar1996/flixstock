import { Clip } from "./types";

export const getTracks = (clips: Clip[]) => {
  const tracks: Record<number, Clip[]> = {};

  clips.forEach((clip) => {
    if (!tracks[clip.track]) tracks[clip.track] = [];
    tracks[clip.track].push(clip);
  });

  return tracks;
};

export const isOverlapping = (a: Clip, b: Clip) => {
  return a.start < b.start + b.duration && b.start < a.start + a.duration;
};

export const findAvailableTrack = (clip: Clip, clips: Clip[]) => {
  let track = 0;

  while (true) {
    const conflict = clips.some(
      (c) => c.track === track && c.id !== clip.id && isOverlapping(c, clip),
    );

    if (!conflict) return track;
    track++;
  }
};

export const getMediaDurationInFrames = (
  file: File,
  fps: number,
): Promise<number> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("image")) {
      URL.revokeObjectURL(url);
      resolve(300);
      return;
    }

    const media = document.createElement(
      file.type.startsWith("video") ? "video" : "audio",
    );

    media.src = url;

    media.onloadedmetadata = () => {
      const durationInSeconds = media.duration;
      const frames = Math.floor(durationInSeconds * fps);

      URL.revokeObjectURL(url);
      resolve(frames);
    };

    media.onerror = (error) => {
      URL.revokeObjectURL(url);
      reject(error);
    };
  });
};

export const getTotalDurationInFrames = (clips: Clip[]) => {
  let longestDuration = 0;

  clips.forEach((x) => {
    let length = x.start + x.duration;
    if (length > longestDuration) longestDuration = length;
  });

  return longestDuration || 1;
};

export const formatTime = (frame: number, fps: number): string => {
  const hours = Math.floor(frame / fps / 3600);

  const remainingMinutes = frame - hours * fps * 3600;
  const minutes = Math.floor(remainingMinutes / 60 / fps);

  const remainingSec = frame - hours * fps * 3600 - minutes * fps * 60;
  const seconds = Math.floor(remainingSec / fps);

  const hoursStr = String(hours);
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  return `${minutesStr}:${secondsStr}`;
};

export const getLastTrack = (clips: Clip[]) => {
  let track = 0;
  clips.forEach((x) => {
    if (x.track > track) track = x.track;
  });
  return track;
};
