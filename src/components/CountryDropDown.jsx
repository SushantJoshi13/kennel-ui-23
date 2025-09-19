import React from "react";
import CountryIds from "../assets/JSON/CountryIds.json";

const CountryDropDown = ({ value, onChange, errorMessage }) => {
  return (
    <div className="flex flex-col">
      <label className="mt-4 text-sm font-medium text-white">
        Enter Country name
      </label>
      <select
        className="my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 text-white shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14"
        name="country"
        value={value}
        onChange={onChange}
      >
        <option value={""} className="text-black">
          Select Country
        </option>
        {CountryIds.sort((a, b) => a.Country.localeCompare(b.Country)).map(
          (c, i) => {
            return (
              <option key={i} value={c.Country} className="text-black">
                {c.Country}
              </option>
            );
          }
        )}
      </select>
      <small className="pl-2 text-xs text-red-500">{errorMessage}</small>
    </div>
  );
};

export default CountryDropDown;
