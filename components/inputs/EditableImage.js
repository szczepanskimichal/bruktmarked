import { useState } from "react";
import UserIcon from "../icons/UserIcon";

export default function EditableImage({ image, setImage, setFullImage }) {
  async function handleFileChange(e) {}

  return (
    <div className="p-2 inline-flex items-center flex-col gap-2">
      <div className="rounded-full flex items-center justify-center bg-white/50 p-1 size-[120px] shadow-lg">
        {image ? (
          <>
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded-full cursor-pointer"
              onClick={() => setFullImage(true)}
            />
          </>
        ) : (
          <UserIcon className="text-color-800" />
        )}
      </div>
      <label className="bg-white/50 border-2 border-color-800 shadow-lg text-center py-1 rounded-md hover:scale-105 transition delay-150 duration-300 cursor-pointer w-full">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={() => {}}
        />
        <span>Edit</span>
      </label>
    </div>
  );
}
