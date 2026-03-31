import { type DragEndEvent } from "@dnd-kit/core";
import { type PlayerRef } from "@remotion/player";
import { useEffect, useMemo, useRef, useState } from "react";
import { AspectRatio, Clip } from "../types";
import { AspectRatioVsDimensions } from "../constants";
import { getTotalDurationInFrames } from "../utils";

export const useApp = () => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("9:16");
  const [isEditing, setIsEditing] = useState(false);
  const playerRef = useRef<PlayerRef>(null);
  const clipSourcesRef = useRef(new Map<string, string>());
  const { width, height } = AspectRatioVsDimensions[aspectRatio ?? "9:16"];
  const totalDurationInFrames = useMemo(
    () => getTotalDurationInFrames(clips),
    [clips],
  );

  useEffect(() => {
    const { current } = playerRef;
    setIsEditing(!(current?.isPlaying() ?? false));
    if (!current) return;

    const onPlay = () => {
      setIsEditing(false);
    };

    const onPause = () => {
      setIsEditing(true);
    };

    current.addEventListener("play", onPlay);
    current.addEventListener("pause", onPause);

    return () => {
      current.removeEventListener("play", onPlay);
      current.removeEventListener("pause", onPause);
    };
  }, [playerRef]);

  useEffect(() => {
    const nextSources = new Map(clips.map((clip) => [clip.id, clip.src]));

    clipSourcesRef.current.forEach((src, id) => {
      if (nextSources.get(id) !== src) {
        URL.revokeObjectURL(src);
      }
    });

    clipSourcesRef.current = nextSources;
  }, [clips]);

  useEffect(() => {
    return () => {
      clipSourcesRef.current.forEach((src) => {
        URL.revokeObjectURL(src);
      });
      clipSourcesRef.current.clear();
    };
  }, []);

  const handleCanvasDragEnd = ({ active, delta }: DragEndEvent) => {
    const player = document.querySelector(".player-root");
    if (!player) return;

    const rect = player.getBoundingClientRect();

    setClips((prev) =>
      prev.map((clip) => {
        if (`canvas-${clip.id}` !== active.id) return clip;

        return {
          ...clip,
          x: clip.x + (delta.x / rect.width) * 100,
          y: clip.y + (delta.y / rect.height) * 100,
        };
      }),
    );
  };

  return {
    aspectRatio,
    clips,
    height,
    isEditing,
    playerRef,
    setAspectRatio,
    setClips,
    totalDurationInFrames,
    width,
    handleCanvasDragEnd,
  };
};
