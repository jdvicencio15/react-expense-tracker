import { forwardRef } from "react";

const Input = forwardRef(
  (
    { id, type = "text", placeholder, value, onChange, className = "" },
    ref,
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          block
          w-full
          max-w-full
          min-w-0
          rounded-xl
          border
          border-gray-300
          dark:border-slate-600
          bg-white
          dark:bg-slate-800
          py-3
          pl-10
          pr-4
          text-gray-700
          dark:text-white
          placeholder:text-gray-400
          dark:placeholder:text-gray-500
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition
          ${className}
        `}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
