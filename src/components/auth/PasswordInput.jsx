import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete = "current-password",
  icon: Icon,
}) {

  const [showPassword, setShowPassword] = useState(false);


  return (

    <div className="mb-4">


      {
        label && (

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

        )
      }



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

          name={name}

          type={showPassword ? "text" : "password"}

          placeholder={placeholder}

          value={value}

          onChange={onChange}

          required={required}

          autoComplete={autoComplete}


          className={`
          w-full
          ${Icon ? "pl-12" : "pl-4"}
          pr-12
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



        <button

          type="button"

          onClick={() => setShowPassword(!showPassword)}

          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          hover:text-blue-500
          transition
          "

        >

          {
            showPassword
              ?
            <EyeOff size={20}/>
              :
            <Eye size={20}/>
          }


        </button>


      </div>


    </div>

  );
}


export default PasswordInput;