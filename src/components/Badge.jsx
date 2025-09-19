import React from "react";

const Badge = ({ text, isVerified }) => {
  return (
    <div
      className={`${
        isVerified ? "bg-green-400" : "bg-red-500"
      } w-fit rounded-md px-3 py-1 text-sm font-semibold text-white`}
    >
      {text}
    </div>
  );
};

export default Badge;
