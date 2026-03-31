import type { MouseEventHandler } from "react";
import { useRef } from "react";
import { FPS } from "../constants";
import { type Clip, type ClipType } from "../types";
import {
  getLastTrack,
  getMediaDurationInFrames,
  getTotalDurationInFrames,
} from "../utils";

export const useFileUploader = (
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>,
  setAudioClips: React.Dispatch<React.SetStateAction<Clip[]>>,
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newClips: Clip[] = await Promise.all(
      Array.from(files).map(async (file, index) => {
        const frames = await getMediaDurationInFrames(file, FPS);
        const type: ClipType = file.type.startsWith("video")
          ? "video"
          : file.type.startsWith("audio")
            ? "audio"
            : "image";

        return {
          id: crypto.randomUUID(),
          type,
          src: URL.createObjectURL(file),
          start: 0,
          duration: frames || 300,
          track: 0,
          name: file.name,
          x: index,
          y: index,
          width: 50,
          height: 50,
          zIndex: 0,
        };
      }),
    );

    const videoImageClips = newClips.filter((x) => x.type !== "audio");
    const audioClips = newClips.filter((x) => x.type === "audio");

    if (videoImageClips.length > 0) {
      setClips((prev) => {
        const updated = [...prev];
        const totalDurationInFrames = getTotalDurationInFrames(prev);
        const currentTrack = getLastTrack(prev);
        let currStart = totalDurationInFrames;

        videoImageClips.forEach((clip) => {
          updated.push({
            ...clip,
            start: currStart,
            track: currentTrack,
            zIndex: currentTrack,
          });
          currStart += clip.duration;
        });

        return updated;
      });
    }

    if (audioClips.length > 0) {
      setAudioClips((prev) => {
        const updated = [...prev];
        const totalDurationInFrames = getTotalDurationInFrames(prev);
        let currStart = totalDurationInFrames;

        audioClips.forEach((clip) => {
          updated.push({
            ...clip,
            start: currStart,
            track: 0,
            zIndex: 0,
          });
          currStart += clip.duration;
        });

        return updated;
      });
    }

    e.target.value = "";
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return {
    handleClick,
    handleUpload,
    inputRef,
  };
};
