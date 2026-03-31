import { type FC } from "react";
import { type Clip } from "../types";
import { useFileUploader } from "../hooks/useFileUploader";

type FileUploaderProps = {
  setClips: React.Dispatch<React.SetStateAction<Clip[]>>;
  setAudioClips: React.Dispatch<React.SetStateAction<Clip[]>>;
};

const FileUploader: FC<FileUploaderProps> = ({ setClips, setAudioClips }) => {
  const { handleClick, handleUpload, inputRef } = useFileUploader(
    setClips,
    setAudioClips,
  );

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*,audio/*"
        onChange={handleUpload}
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="p-2 border rounded-md cursor-pointer bg-black text-white hover:bg-gray-500"
      >
        Add file
      </button>
    </div>
  );
};

export default FileUploader;
