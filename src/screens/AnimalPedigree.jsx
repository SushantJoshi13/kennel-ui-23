import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TreePage from "../components/Tree";

const AnimalPedigree = () => {
  const { state } = useLocation();
  const nav = useNavigate();

  return (
    <div className="h-screen">
      <div className="fixed top-0 flex w-full items-center justify-between bg-primary p-3 px-10 text-white">
        <h1 className="">Animal Pedigree</h1>
        <div>
          <button
            className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white"
            onClick={() => nav(-1)}
          >
            Back
          </button>
        </div>
      </div>
      <TreePage readOnly tree={state.data} />
    </div>
  );
};

export default AnimalPedigree;
