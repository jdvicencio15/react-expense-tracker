function Select({
  id,
  value,
  onChange,
  children,
  className = ""
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`
        w-full
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
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        transition
        duration-200
        ${className}
      `}
    >
      {children}
    </select>
  );
}

export default Select;