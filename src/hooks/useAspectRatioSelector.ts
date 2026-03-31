import { type ChangeEventHandler, type Dispatch, type SetStateAction } from "react";
import { AspectRatiosOptions } from "../constants";
import { type AspectRatio } from "../types";

export const useAspectRatioSelector = (
  setAspectRatio: Dispatch<SetStateAction<AspectRatio>>,
) => {
  const handleChange: ChangeEventHandler<
    HTMLSelectElement,
    HTMLSelectElement
  > = (e) => setAspectRatio(e.currentTarget.value as AspectRatio);

  return {
    aspectRatiosOptions: AspectRatiosOptions,
    handleChange,
  };
};
