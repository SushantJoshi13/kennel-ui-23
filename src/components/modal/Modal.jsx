import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({
  isOpen,
  setIsOpen,
  heading,
  subheading,
  child,
  size,
  height,
  onSave,
  saveButtonTitle,
  hasDefaultButtons = true,
  closeBtnTitle,
  isLoading,
  showHeaderClose = true,
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return isOpen ? (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={`relative z-30`} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-100" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div
              className={`flex min-h-full  items-center justify-center bg-[rgba(0,0,0,0.5)] p-4 text-center`}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`flex w-full flex-col justify-between ${size} h- transform overflow-hidden rounded-xl bg-white p-0 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    // as="h3"
                    className="border-primary-700 bg-secondary-v1 border-b p-5 pb-2 text-lg font-medium !capitalize text-gray-900"
                  >
                    <div className="flex justify-between !capitalize">
                      <div className="font-openSans capitalize">
                        <h1 className="">{heading}</h1>
                        {!!subheading && (
                          <p className="font-openSans text-xs">{subheading}</p>
                        )}
                      </div>
                      {showHeaderClose ? (
                        <div
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          X
                        </div>
                      ) : null}
                    </div>
                  </Dialog.Title>
                  <Dialog.Description
                    as="div"
                    className="bg-bgColor-400 border-primary-700 border-t"
                  >
                    <div className="h-full max-h-[70vh] overflow-auto p-3">
                      {child}
                    </div>
                  </Dialog.Description>
                  {hasDefaultButtons && (
                    <div className="flex justify-end gap-3 p-3">
                      <button
                        className="rounded-md bg-red-500 px-4 py-2 text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        {closeBtnTitle ?? "Close"}
                      </button>
                      <button
                        className="rounded-md bg-green-400 px-4 py-2 text-white"
                        type="submit"
                        onClick={() => {
                          onSave();
                        }}
                      >
                        <>
                          {isLoading ? (
                            <span className="loader"></span>
                          ) : (
                            <>{saveButtonTitle ?? "Save"}</>
                          )}
                        </>
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  ) : (
    <></>
  );
}
