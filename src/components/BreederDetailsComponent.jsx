import React from "react";

const BreederDetailsComponent = ({
  labelName,
  fieldValue,
  isDoc = false,
  docLink,
}) => {
  return (
    <div>
      <label className="text-sm font-medium py-2 capitalize">{labelName}</label>
      <p
        onClick={() => {
          if (isDoc) {
            window.open(docLink, "_blank", "noreferrer");
          }
        }}
        className={`capitalize border-2 rounded-lg my-2 p-2 ${
          isDoc ? "text-blue-700 cursor-pointer" : ""
        }`}
      >
        {fieldValue}
      </p>
    </div>
  );
};

export default BreederDetailsComponent;
