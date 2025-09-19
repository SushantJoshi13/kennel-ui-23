import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Modal = ({
  onSubmit,
  onClose,
  isOpen,
  isFirst,
  onEdit,
  node,
  value,
  parentAlreadyExist,
}) => {
  const [txt, setTxt] = useState("");
  const [parentType, setParentType] = useState("");

  useEffect(() => {
    if (node && value === "Edit") {
      setTxt(node.name);
      setParentType(node?.attributes?.parentType);
    } else {
      setTxt("");
      setParentType("");
    }
  }, [node]);

  return (
    <>
      {isOpen || isFirst ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative w-3/6">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*body*/}
                <div className="relative flex-auto p-6">
                  {!isFirst && (
                    <div>
                      <p className="my-4 text-lg leading-relaxed text-slate-500">
                        Select Parent Type:
                      </p>
                      <select
                        className="w-full rounded border-2 border-slate-200 px-3 py-2 leading-tight text-slate-700 focus:border-emerald-500 focus:bg-white focus:outline-none"
                        value={parentType}
                        onChange={(e) => setParentType(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Parent Type
                        </option>
                        <option
                          value="Sire"
                          disabled={parentAlreadyExist === "Sire"}
                        >
                          Sire
                        </option>
                        <option
                          value="Dam"
                          disabled={parentAlreadyExist === "Dam"}
                        >
                          Dam
                        </option>
                      </select>
                    </div>
                  )}
                  <p className="my-4 text-lg leading-relaxed text-slate-500">
                    Enter Name:
                  </p>
                  <input
                    className="w-full rounded border-2 border-slate-200 px-3 py-2 leading-tight text-slate-700 focus:border-emerald-500 focus:bg-white focus:outline-none"
                    id="familyMemberName"
                    type="text"
                    placeholder="Enter Name"
                    value={txt}
                    onChange={(e) => {
                      if (e.target.value.length > 30) {
                        toast.error("Only 30 characters allowed");
                      } else {
                        setTxt(e.target.value);
                      }
                    }}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {value === "Create" && (
                    <button
                      className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600 disabled:bg-emerald-100"
                      type="button"
                      onClick={() => onSubmit(txt, parentType)}
                      disabled={
                        isFirst
                          ? txt.length < 3
                          : parentType === "" || txt.length < 3
                      }
                      // {...(parentType === "" &&
                      //   !isFirst &&
                      //   txt.length < 3 && { disabled: true })}
                    >
                      Add
                    </button>
                  )}
                  {value === "Edit" && (
                    <button
                      className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                      type="button"
                      onClick={() => onEdit(txt, parentType)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
