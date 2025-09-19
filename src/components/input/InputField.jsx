import { useField } from 'formik';
import React from 'react';

function InputField({
  label,
  name,
  type,
  className,
  placeholder,
  onChange,
  onBlur,
}) {
  const [field, meta] = useField({ name });

  return (
    <div className={`flex flex-col gap-1 mb-6`}>
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold pb-1 px-2"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        id={name}
        {...field}
        placeholder={label ? label : placeholder}
        className={`${
          meta.touched && meta.error ? 'is-invalid ' : ''
        } ${className} appearance-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-primary-bgPrimary`}
      />
      {meta.touched && meta.error ? (
        <small className="invalid-feedback text-red-500 pl-2">{meta.error}</small>
      ) : null}
    </div>
  );
}

export default InputField;
