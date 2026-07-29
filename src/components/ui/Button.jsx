function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4
        py-2
        rounded-xl
        font-medium
        transition
        bg-blue-600
        text-white
        hover:bg-blue-700
        disabled:opacity-50
        disabled:cursor-not-allowed
        dark:bg-blue-500
        dark:hover:bg-blue-600
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;