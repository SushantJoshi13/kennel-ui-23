import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useMemo, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export const DropDownField = ({
  onSelect,
  selected,
  data,
  label,
  placeholder = `Select ${label}`,
  disabled = false,
  className,
}) => {
  const [query, setQuery] = useState("");
  const filteredPeople =
    query === ""
      ? data
      : data.filter((d) =>
          d.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const selectedOption = useMemo(() => {
    if (typeof selected === "string" || typeof selected === "number") {
      return data.find((s) => s?.value === selected);
    }

    return selected;
  }, [selected, data]);

  return (
    <div>
      <h4 className={`font-bold mb-1 text-gray-700 block ${className}`}>
        {label}
      </h4>
      <Combobox
        disabled={disabled}
        nullable
        value={selectedOption}
        onChange={(value) => {
          return onSelect(value);
        }}
      >
        <div className="relative mb-4 mt-2 col-span-4 ">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              placeholder={placeholder ?? label}
              className="z-10 w-full capitalize border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person) => (person ? person.label : placeholder)}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople?.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.value}
                    className={({ active }) =>
                      `capitalize relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => {
                      const isSelected =
                        selected || selectedOption?.value === person?.value;
                      // console.log('sll', selectedOption?.value);
                      return (
                        <>
                          <span
                            className={`block truncate ${
                              isSelected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.label}
                          </span>
                          {isSelected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      );
                    }}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
