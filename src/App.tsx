import { Player } from "@remotion/player";
import Timeline from "./components/Timeline";
import FileUploader from "./components/FileUploader";
import AspectRatioSelector from "./components/AspectRatioSelector";
import { FPS } from "./constants";
import PlayableComposition from "./components/PlayableComposition";
import { DndContext } from "@dnd-kit/core";
import EditingComposition from "./components/EditingComposition";
import Controls from "./components/Controls";
import { useApp } from "./hooks/useApp";

export default function App() {
  const {
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
    audioClips,
    setAudioClips,
    playerClips,
  } = useApp();

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-2">
        <AspectRatioSelector
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
        />
        <FileUploader setClips={setClips} setAudioClips={setAudioClips} />
      </div>
      <div className="flex justify-center relative">
        <DndContext onDragEnd={handleCanvasDragEnd}>
          <div className="player-root">
            <Player
              ref={playerRef}
              component={isEditing ? EditingComposition : PlayableComposition}
              inputProps={{ clips: playerClips, setClips }}
              durationInFrames={totalDurationInFrames}
              fps={FPS}
              compositionWidth={width}
              compositionHeight={height}
            />
            <Controls
              playerRef={playerRef}
              durationInFrames={totalDurationInFrames}
            />
          </div>
        </DndContext>
      </div>

      <Timeline
        clips={clips}
        setClips={setClips}
        playerRef={playerRef}
        audioClips={audioClips}
        setAudioClips={setAudioClips}
      />
    </div>
  );
}
