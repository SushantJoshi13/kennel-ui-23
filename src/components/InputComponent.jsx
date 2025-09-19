import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const InputComponent = ({
  id,
  name,
  placeholder,
  type,
  value,
  onChange,
  errorMessage,
  required,
  className,
  style,
  ...rest
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  return (
    <div className="flex flex-col">
      <label
        className={` mt-4 text-sm font-medium text-white ${
          !!className && className
        }`}
        style={!!style ? style : {}}
      >
        {placeholder}
      </label>
      <input
        variant="standard"
        type={passwordVisibility ? "text" : type}
        className={`my-2 h-12 w-full rounded-lg border bg-transparent px-3 py-3 text-white shadow-md outline-gray-700 hover:shadow-xl hover:outline-none md:h-14 ${
          !!className && className
        }`}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        style={!!style ? style : {}}
        onChange={onChange}
        min={new Date().toISOString().split("T")[0]}
        max={
          new Date(new Date().setFullYear(new Date().getFullYear() + 2))
            .toISOString()
            .split("T")[0]
        }
        required={required}
        {...rest}
      />
      {id === "password" || id === "confirm_password" ? (
        <span>
          {passwordVisibility ? (
            <BsEye
              className="relative -top-[40px] left-[90%] text-white md:-top-[45px]"
              onClick={() => {
                setPasswordVisibility(false);
              }}
            />
          ) : (
            <BsEyeSlash
              className="relative -top-[40px] left-[90%] text-white md:-top-[45px]"
              onClick={() => {
                setPasswordVisibility(true);
              }}
            />
          )}
        </span>
      ) : (
        ""
      )}
      <small className="pl-2 text-xs text-red-500">{errorMessage}</small>
    </div>
  );
};

export default InputComponent;
