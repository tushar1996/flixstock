# Flixstock Timeline Editor

A small browser-based media editor built with React, Vite, Remotion, and `@dnd-kit/core`.

The app lets you upload image, video, and audio assets, arrange them on a timeline, preview playback, and reposition/resize visual clips on a canvas.

## Features

- Upload image, video, and audio files directly from the browser
- Auto-detect media duration for video and audio assets
- Build a timeline with multiple tracks
- Drag clips horizontally to change timing
- Move clips across tracks with overlap-aware track placement
- Resize clips on the timeline
- Preview the composition inside a Remotion player
- Switch between playback mode and editing mode automatically based on play/pause state
- Drag and resize visual clips on the canvas while editing
- Toggle between `9:16` and `16:9` aspect ratios

## Tech Stack

- React 19
- TypeScript
- Vite
- Remotion / `@remotion/player`
- `@dnd-kit/core`
- Tailwind CSS v4

## How It Works

Each uploaded asset becomes a `Clip` object with:

- media type
- source URL
- start frame
- duration in frames
- canvas position and size
- track index
- z-index/layering

The timeline uses frame-based editing. Visual clips can also be positioned on the player canvas using percentage-based coordinates, which makes them adapt to different aspect ratios.

## Project Structure

```text
src/
  App.tsx                  Main app container and player setup
  components/              UI components
  hooks/                   Custom hooks for component logic
  constants.ts             FPS, scale, aspect ratio dimensions, colors
  types.ts                 Shared TypeScript types
  utils.ts                 Timeline/media helper utilities
```

Notable areas:

- `src/components/Timeline.tsx`: timeline interaction and scrubbing
- `src/components/EditingComposition.tsx`: edit-mode canvas rendering
- `src/components/PlayableComposition.tsx`: playback composition rendering
- `src/hooks/`: behavior extracted from UI components to keep components thinner
- `src/utils.ts`: duration helpers, overlap checks, and track calculations

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

If you use `pnpm` instead of `npm`, the equivalent commands work as well.

## Editing Workflow

1. Upload one or more media files.
2. Clips are appended to the end of the timeline.
3. Use the timeline to drag or resize clip timing.
4. Pause playback to enter editing mode.
5. Drag and resize visual clips on the player canvas.
6. Play again to preview the final composition.

## Notes

- Image assets default to a fixed duration when uploaded.
- Blob URLs are revoked when clips are removed or when the app unmounts.
- The editor currently stores state in-memory only; there is no persistence/export pipeline yet.

## Future Improvements

- Save/load projects
- Clip selection and inspector controls
- Better timeline zooming
- Undo/redo
- Export/render workflow
- Snap to frame while resizing
- timeline ticks
