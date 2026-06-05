"use client";

import { uploadToCloudinary } from "@/lib/actions/action";
import { toast } from "@heroui/react";
import Image from "next/image";
import { useRef, useState } from "react";


export function LogoUpload({ value, onChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(value || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadToCloudinary(formData);
      onChange?.(url);
    } catch {
      setError("Upload failed. Please try again.");
      setPreview(null);
    } finally {
      toast.success('logo successfully uploaded')
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Company Logo</label>

      <div
        onClick={() => inputRef.current?.click()}
        className="
          flex flex-col items-center justify-center gap-2
          w-full h-28 rounded-xl border-2 border-dashed
          border-default-300 bg-default-50
          cursor-pointer hover:bg-default-100 transition-colors
          relative overflow-hidden
        "
      >
        {loading ? (
          <span className="text-sm text-muted animate-pulse">Uploading...</span>
        ) : preview ? (
          <Image
            src={preview}
            alt="Logo preview"
            height={50}
            width={50}
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-7 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="text-sm font-medium">Upload image</span>
          </>
        )}
      </div>

      <p className="text-xs text-muted mt-0.5">PNG, JPG up to 5MB</p>
      {error && <p className="text-xs text-danger">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}