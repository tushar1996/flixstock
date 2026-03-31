import { type DragEndEvent } from "@dnd-kit/core";
import { type PlayerRef } from "@remotion/player";
import { type MouseEventHandler, useMemo, useState } from "react";
import { SCALE, TRACK_HEIGHT } from "../constants";
import { type Clip } from "../types";
import { findAvailableTrack, getTracks } from "../utils";

export const useTimeline = (
  clips: Clip[],
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>,
  playerRef: React.RefObject<PlayerRef | null>,
  setAudioClips: React.Dispatch<React.SetStateAction<Clip[]>>,
) => {
  const tracks = useMemo(() => getTracks(clips), [clips]);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleScrubbing = (newFrame: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(newFrame);
    }
  };

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) return;
    setIsScrubbing(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    handleScrubbing(Math.max(0, Math.round(x / SCALE)));
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isScrubbing) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    handleScrubbing(Math.max(0, Math.round(x / SCALE)));
  };

  const handleMouseUp = () => setIsScrubbing(false);
  const handleMouseLeave = () => setIsScrubbing(false);
  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = (e: DragEndEvent) => {
    setIsDragging(false);
    const { delta, active } = e;

    setClips((prev) =>
      prev.map((clip) => {
        if (clip.id !== active.id) return clip;

        const newStart = Math.max(0, clip.start + Math.round(delta.x / SCALE));
        const newTrack = Math.max(
          0,
          clip.track + Math.round(delta.y / TRACK_HEIGHT),
        );
        const updated = { ...clip, start: newStart, track: newTrack };
        const finalTrack = findAvailableTrack(updated, prev);

        return {
          ...updated,
          track: finalTrack,
          zIndex: finalTrack,
        };
      }),
    );
  };

  const handleDragEndAudio = (e: DragEndEvent) => {
    setIsDragging(false);
    const { delta, active } = e;

    setAudioClips((prev) =>
      prev.map((clip) => {
        if (clip.id !== active.id) return clip;

        const newStart = Math.max(0, clip.start + Math.round(delta.x / SCALE));
        const updated = { ...clip, start: newStart };

        return updated;
      }),
    );
  };

  return {
    tracks,
    handleDragEnd,
    handleDragStart,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    handleDragEndAudio,
  };
};
