import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";


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

      navigate("/dashboard");


    } catch (error) {

      setError(
        error.message || "Login failed"
      );

    } finally {

      setLoading(false);

    }

  }




  return (
    <AuthLayout
      title="Log in"
      subtitle="Welcome back! Please sign in to continue."
    >
      {error && (
        <div
          className="
          mb-4
          rounded-xl
          bg-red-100
          p-3
          text-sm
          text-red-600
          dark:bg-red-900/30
          dark:text-red-300
        "
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          icon={Mail}
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

       <PasswordInput
  label="Password"
  name="password"
  icon={Lock}
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
  autoComplete="current-password"
  required
/>

        <div
          className="
          flex
          items-center
          justify-between
          text-sm
        "
        >
          <label
            className="
            flex
            items-center
            gap-2
            dark:text-slate-300
          "
          >
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
              className="h-4 w-4"
            />

            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="
            text-blue-500
            hover:text-blue-600
            transition
          "
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          rounded-xl
          bg-gradient-to-r
          from-purple-600
          to-blue-600
          py-3
          font-semibold
          text-white
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        >
          {loading
            ? "Logging in..."
            : "Log in"}
        </button>
      </form>

      <p
        className="
        mt-6
        text-center
        text-sm
        text-gray-500
        dark:text-slate-300
      "
      >
        Don't have an account?

        <Link
          to="/register"
          className="
          ml-2
          font-semibold
          text-blue-600
          hover:underline
        "
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );

}


export default Login;