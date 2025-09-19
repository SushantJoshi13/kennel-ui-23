import React from "react";

const ContactUsInput = ({
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
  return (
    <div className="flex flex-col">
      <label className="">
        {placeholder}
        <span className="items-center text-xs text-red-600">*</span>
      </label>
      <input
        variant="standard"
        type={type}
        className="rounded border-b-4 border-yellow-300 p-2"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        style={!!style ? style : {}}
        onChange={onChange}
        required={required}
        {...rest}
      />
      <small className="pl-2 text-xs text-red-500">{errorMessage}</small>
    </div>
  );
};

export default ContactUsInput;
