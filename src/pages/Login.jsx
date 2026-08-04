import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Wallet,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";



function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

    const [rememberMe, setRememberMe] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);



  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  }




  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    setLoading(true);


    try {

      await login({
  ...formData,
  rememberMe,
});

      navigate("/");


    } catch (error) {

      setError(
        error.message || "Login failed"
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





        {/* TITLE */}

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
          Track your expenses.
          Manage your budget.
          Achieve your goals.
        </p>







        <h2 className="
          text-2xl
          font-bold
          mt-8
          mb-5
          text-blue-600
          dark:text-blue-400
        ">
          Log in
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





          {/* EMAIL */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              mb-2
              dark:text-white
            ">
              Email or Username
            </label>



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

                placeholder="Enter your email"

                value={formData.email}

                onChange={handleChange}

                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  dark:border-slate-600
                  dark:bg-slate-700
                  dark:text-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "

                required

              />


            </div>

          </div>







          {/* PASSWORD */}

          <div>


            <label className="
              block
              text-sm
              font-semibold
              mb-2
              dark:text-white
            ">
              Password
            </label>




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

                placeholder="Enter your password"

                value={formData.password}

                onChange={handleChange}

                className="
                  w-full
                  pl-12
                  pr-12
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  dark:border-slate-600
                  dark:bg-slate-700
                  dark:text-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
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


          </div>








          {/* OPTIONS */}

          <div className="
            flex
            justify-between
            items-center
            text-sm
          ">


            <label className="
              flex
              items-center
              gap-2
              dark:text-slate-300
            ">

             <input
  type="checkbox"
  checked={rememberMe}
  onChange={(e) =>
    setRememberMe(e.target.checked)
  }
  className="
    w-4
    h-4
  "
/>

              Remember me

            </label>




            <button
              type="button"
              className="
                text-blue-600
                hover:underline
              "
            >
              Forgot Password?
            </button>


          </div>









          {/* BUTTON */}


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
              "Logging in..."
              :
              "Log in"
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

          Don't have an account?


          <Link

            to="/register"

            className="
              ml-2
              text-blue-600
              font-semibold
              hover:underline
            "

          >
            Sign up
          </Link>


        </p>




      </div>


    </div>

  );

}


export default Login;