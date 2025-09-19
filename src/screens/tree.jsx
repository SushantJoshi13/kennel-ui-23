import React from "react";
import { Link } from "react-router-dom";
import Tree from "../components/Tree";
import { useTreeContext } from "../context/TreeContext";

export const TreeDia = () => {
  const { tree, setTree } = useTreeContext();
  return (
    <div>
      <div className="sticky top-0 flex h-[10vh] w-screen items-center justify-between bg-primary p-[1rem_5rem] shadow-lg">
        <h1 className="text-white">Animal Pedigree</h1>
        <Link
          to={-1}
          className="rounded-md border-2 border-green-600 bg-green-600 p-[0.5rem_2rem] text-white"
        >
          Save
        </Link>
      </div>
      <Tree setTree={setTree} tree={tree} />
    </div>
  );
};
