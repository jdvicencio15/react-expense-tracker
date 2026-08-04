import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Wallet,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";


function Register() {

  const navigate = useNavigate();

  const { register } = useAuth();


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  }




  async function handleSubmit(e) {

    e.preventDefault();

    setError("");


    if(formData.password !== formData.confirmPassword){

      setError("Passwords do not match");

      return;

    }


    setLoading(true);


    try {

     await register({
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  password: formData.password,
});

        setFormData({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});



navigate("/login", {
  state: {
    message: "Account created successfully. Please login."
  }
});


    } catch(error){

      setError(
        error.message || "Registration failed"
      );


    } finally {

      setLoading(false);

    }

  }



  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      px-4
      bg-gradient-to-br
      from-blue-50
      via-white
      to-blue-100
      dark:from-slate-900
      dark:via-slate-900
      dark:to-slate-800
    ">


      <div className="
        w-full
        max-w-md
        bg-white
        dark:bg-slate-800
        rounded-3xl
        shadow-xl
        p-8
      ">


        {/* LOGO */}

        <div className="
          flex
          justify-center
          mb-5
        ">

          <div className="
            w-20
            h-20
            rounded-2xl
            bg-gradient-to-br
            from-purple-600
            to-blue-600
            flex
            items-center
            justify-center
            shadow-lg
          ">

            <Wallet
              size={42}
              className="text-white"
            />

          </div>

        </div>



        <h1 className="
          text-center
          text-3xl
          font-bold
          text-slate-900
          dark:text-white
        ">

          AK's
          <br/>
          Expense Tracker V1

        </h1>


        <p className="
          text-center
          mt-3
          text-sm
          text-gray-500
          dark:text-slate-400
        ">

          Create your account
          and start managing your money.

        </p>




        <h2 className="
          text-2xl
          font-bold
          mt-8
          mb-5
          text-blue-600
          dark:text-blue-400
        ">

          Sign up

        </h2>




        {error && (

          <div className="
            mb-4
            p-3
            rounded-xl
            bg-red-100
            text-red-600
            dark:bg-red-900/30
            dark:text-red-300
            text-sm
          ">

            {error}

          </div>

        )}




        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >



          {/* NAME */}

          <div className="grid grid-cols-2 gap-3">


            <div className="relative">

              <User
                size={20}
                className="
                  absolute
                  left-4
                  top-3.5
                  text-gray-400
                "
              />


              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}

                className="
                  w-full
                  pl-12
                  py-3
                  rounded-xl
                  border
                  dark:border-slate-600
                  dark:bg-slate-700
                  dark:text-white
                  focus:ring-2
                  focus:ring-blue-500
                  outline-none
                "
                required
              />

            </div>



            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}

              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                dark:border-slate-600
                dark:bg-slate-700
                dark:text-white
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "

              required

            />


          </div>





          {/* EMAIL */}

          <div className="relative">


            <Mail
              size={20}
              className="
                absolute
                left-4
                top-3.5
                text-gray-400
              "
            />


            <input

              type="email"

              name="email"

              placeholder="Email"

              value={formData.email}

              onChange={handleChange}


              className="
                w-full
                pl-12
                py-3
                rounded-xl
                border
                dark:border-slate-600
                dark:bg-slate-700
                dark:text-white
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "

              required

            />


          </div>






          {/* PASSWORD */}

          <div className="relative">

            <Lock
              size={20}
              className="
                absolute
                left-4
                top-3.5
                text-gray-400
              "
            />


            <input

              type={
                showPassword
                ? "text"
                : "password"
              }

              name="password"

              placeholder="Password"

              value={formData.password}

              onChange={handleChange}


              className="
                w-full
                pl-12
                pr-12
                py-3
                rounded-xl
                border
                dark:border-slate-600
                dark:bg-slate-700
                dark:text-white
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "

              required

            />



            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }

              className="
                absolute
                right-4
                top-3.5
                text-gray-400
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






          {/* CONFIRM PASSWORD */}

          <div className="relative">


            <Lock
              size={20}
              className="
                absolute
                left-4
                top-3.5
                text-gray-400
              "
            />



            <input

              type={
                showConfirmPassword
                ?
                "text"
                :
                "password"
              }

              name="confirmPassword"

              placeholder="Confirm Password"

              value={formData.confirmPassword}

              onChange={handleChange}


              className="
                w-full
                pl-12
                pr-12
                py-3
                rounded-xl
                border
                dark:border-slate-600
                dark:bg-slate-700
                dark:text-white
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "

              required

            />



            <button

              type="button"

              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }


              className="
                absolute
                right-4
                top-3.5
                text-gray-400
              "

            >

              {
                showConfirmPassword
                ?
                <EyeOff size={20}/>
                :
                 <Eye size={20}/>
              }



            </button>


          </div>






          <button

            type="submit"

            disabled={loading}


            className="
              w-full
              py-3
              rounded-xl
              text-white
              font-semibold
              bg-gradient-to-r
              from-purple-600
              to-blue-600
              hover:opacity-90
              transition
              disabled:opacity-50
            "

          >

            {
              loading
              ?
              "Creating account..."
              :
              "Create Account"
            }


          </button>




        </form>





        <p className="
          text-center
          mt-6
          text-sm
          text-gray-500
          dark:text-slate-300
        ">


          Already have an account?


          <Link

            to="/login"

            className="
              ml-2
              text-blue-600
              font-semibold
              hover:underline
            "

          >

            Log in

          </Link>


        </p>



      </div>


    </div>

  );


}


export default Register;