import React, { useState } from "react";
import DeclarationModal from "../modal/DeclarationModal";

const TermsCheckbox = ({
  onChange,
  termTitle,
  linkTitle,
  termContent,
  modalTitle,
  name,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex gap-3">
        <input
          type="checkbox"
          id={name}
          onChange={(e) => onChange(e.target.checked)}
          name={name}
        />
        <label htmlFor={name} className="font-semibold italic text-gray-300 ">
          I accept to {termTitle}
          <span
            onClick={(e) => {
              setIsOpen(true);
              e.preventDefault();
            }}
            className="cursor-pointer underline"
          >
            {linkTitle}
          </span>
        </label>
      </div>
      {!!error && (
        <span className="text-sm capitalize text-red-500">{error}</span>
      )}
      <DeclarationModal
        children={termContent}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={modalTitle}
      />
    </>
  );
};

export default TermsCheckbox;
