function AuthInput({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  icon: Icon,
  autoComplete,
  required
}) {

  return (

    <div className="mb-4">

      <label
        className="
        block
        text-sm
        font-semibold
        mb-2
        text-gray-700
        "
      >
        {label}
      </label>


      <div className="relative">

        {
          Icon && (

            <Icon
              size={20}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />

          )
        }


        <input

          type={type}

          name={name}

          placeholder={placeholder}

          value={value}

          onChange={onChange}

          autoComplete={autoComplete}

          required={required}

          className={`
          w-full
          ${Icon ? "pl-12" : "px-4"}
          py-3
          rounded-xl
          border
          border-gray-200
          text-gray-900
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition
          `}
        />


      </div>


    </div>

  );
}


export default AuthInput;