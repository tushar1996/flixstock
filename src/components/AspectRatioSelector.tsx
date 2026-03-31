import { type Dispatch, type FC, type SetStateAction } from "react";
import { type AspectRatio } from "../types";
import { useAspectRatioSelector } from "../hooks/useAspectRatioSelector";

type AspectRatioSelectorProps = {
  aspectRatio: AspectRatio;
  setAspectRatio: Dispatch<SetStateAction<AspectRatio>>;
};

const AspectRatioSelector: FC<AspectRatioSelectorProps> = ({
  aspectRatio,
  setAspectRatio,
}) => {
  const { aspectRatiosOptions, handleChange } =
    useAspectRatioSelector(setAspectRatio);

  return (
    <select
      value={aspectRatio}
      onChange={handleChange}
      className="border p-1 rounded-md"
      name="AspectRatioSelector"
    >
      {aspectRatiosOptions.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default AspectRatioSelector;
