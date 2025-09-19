import { useEffect } from "react";
import Modal from "./modal/Modal";

const ImageUploader = ({
  image,
  isOpen,
  setIsOpen,
  handleProfileUpload,
  isLoading,
}) => {
  useEffect(() => {
    setIsOpen(!!image);
  }, [image]);

  const modalContent = image && (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="max-w-2xl"
      height="h-1/2"
      heading="Image Preview"
      onSave={handleProfileUpload}
      saveButtonTitle="Upload"
      closeBtnTitle="Cancel"
      isLoading={isLoading}
      child={
        <div className="mt-5 flex flex-col">
          <img
            src={URL.createObjectURL(image)}
            className="max-w-full max-h-320"
            alt="Thumb"
          />
        </div>
      }
    />
  );

  return (
    <div className="flex flex-col justify-center items-center pt-5">
      {modalContent}
    </div>
  );
};

export default ImageUploader;
