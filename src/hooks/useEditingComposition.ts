import { type Clip } from "../types";

export const useEditingComposition = (
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>,
) => {
  const updateClip = (id: string, updates: Partial<Clip>) => {
    setClips((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  };

  return {
    updateClip,
  };
};
