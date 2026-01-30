import React, { useState, useEffect } from "react";
import { PhotoUploadTypes } from "./config/type";
import { Input } from "../../components/ui/input";
import Modal from "../Modal/Modal";
import { Button } from "../../components/ui/button";
import { Check, X } from "lucide-react";

const PhotoUpload: React.FC<PhotoUploadTypes> = ({
  inputClass,
  file,
  setFile,
  label = "Photo Upload",
  required = false,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [photoSuggestion, setPhotoSuggestion] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());

  // Handle Image Validation and Preview
  useEffect(() => {
    const checkPhoto = async (selectedFile: File) => {
      const img = new window.Image();
      img.src = URL.createObjectURL(selectedFile);

      img.onload = () => {
        const { width, height } = img;

        if (width === height) {
          setPhotoSuggestion("This photo is perfect for a profile picture.");
        } else if (width > height) {
          setPhotoSuggestion("This photo is good for a background image.");
        } else {
          setPhotoSuggestion("This photo might be suitable for a portrait.");
        }
      };
    };

    if (file) {
      const selectedFile = file?.target?.files[0];

      if (selectedFile) {
        if (
          selectedFile.type === "image/png" ||
          selectedFile.type === "image/jpeg"
        ) {
          setErrorMsg("");
          const previewURL = URL.createObjectURL(selectedFile);
          setPreview(previewURL);

          checkPhoto(selectedFile); // Check photo dimensions
        } else {
          setErrorMsg("Please choose a JPG or PNG file.");
          setPhotoSuggestion("");
        }
      } else {
        setPreview(file);
      }
    }
  }, [file]);

  return (
    <div>
      {/* File Input */}
      <Input
        key={inputKey}
        required={required}
        label={label}
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => {
          setFile(e);
          setIsOpen(true);
        }}
        className={`${inputClass}`}
        placeholder={file?.name ? file?.name : "Choose an image"}
      />

      {/* Modal for Image Preview */}
      <Modal
        header={label}
        description={photoSuggestion}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="gap-2 pb-5 flex justify-end">
          {preview && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setIsOpen(false);
                setFile(null);
                setInputKey(Date.now());
              }}
              className="text-xs"
            >
              <X />
            </Button>
          )}
          {preview && (
            <Button
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-xs"
            >
              <Check />
            </Button>
          )}
        </div>

        {preview && (
          <div className="relative w-full h-96 mb-4 mx-auto">
            <img
              src={preview}
              alt="Selected preview"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded object-contain"
            />
          </div>
        )}

        {file && <p className="text-center">Selected File: {file.name}</p>}

        {errorMsg && <p className="text-solidRed">{errorMsg}</p>}
      </Modal>
    </div>
  );
};

export default PhotoUpload;
