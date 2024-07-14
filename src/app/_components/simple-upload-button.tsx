"use client";

import { useUploadThing } from "../utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Input = Parameters<typeof useUploadThing>;

//The thing we want the button to do (custom hook)
const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
    >
      <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width="24"
      height="24"
      stroke="#000"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="red"
    >
      <g className="spinner_V8m1">
        <circle cx="12" cy="12" r="9.5" fill="white" stroke-width="3"></circle>
      </g>
    </svg>
  );
}

export default function SimpleUploadButton() {
  const router = useRouter();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      toast(
        <div className="flex gap-2 items-center">
          <LoadingSpinner />
          <span className="text-lg">Uploading...</span>
        </div>,
        { id: "upload-begin" }
      );
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast("Upload complete");
      router.refresh();
    },
  });

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadSvg />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
