import React from "react";
import Modal from "./Modal";
import moment from "moment";

const DeclarationModal = ({ children, title, isOpen, setIsOpen }) => {
  return (
    <div>
      <Modal
        child={
          <>
            {children}
            <br />
            Date: &nbsp;
            {moment(new Date()).format("DD-MM-YYYY")}
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-red-400 px-4 py-2 text-white transition-all duration-300 hover:bg-red-500"
              >
                Close
              </button>
            </div>
          </>
        }
        heading={`${title} Terms & conditions`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size={"max-w-2xl"}
        hasDefaultButtons={false}
      />
    </div>
  );
};

export default DeclarationModal;
