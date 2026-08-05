import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  User,
  Mail,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";


import Swal from "sweetalert2";


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



await Swal.fire({
  icon: "success",
  title: "Account Created!",
  text: "Your account has been created successfully.",
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false,
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

<AuthLayout
  title="Sign up"
  subtitle="Create your account and start managing your money."
>


{error && (

<div
className="
mb-4
p-3
rounded-xl
bg-red-100
text-red-600
dark:bg-red-900/30
dark:text-red-300
text-sm
"
>
{error}
</div>

)}



<form
onSubmit={handleSubmit}
className="space-y-3"
>


<div
className="
grid
grid-cols-2
gap-3
"
>


<AuthInput
label="First Name"
type="text"
name="firstName"
placeholder="First Name"
icon={User}
value={formData.firstName}
onChange={handleChange}
autoComplete="given-name"
required
/>


<AuthInput
label="Last Name"
type="text"
name="lastName"
placeholder="Last Name"
value={formData.lastName}
onChange={handleChange}
autoComplete="family-name"
required
/>


</div>



<AuthInput
label="Email Address"
type="email"
name="email"
placeholder="Enter your email"
icon={Mail}
value={formData.email}
onChange={handleChange}
autoComplete="email"
required
/>



<PasswordInput
label="Password"
name="password"
placeholder="Create Password"
value={formData.password}
onChange={handleChange}
autoComplete="new-password"
icon={Lock}
required
/>



<PasswordInput
label="Confirm Password"
name="confirmPassword"
placeholder="Confirm Password"
value={formData.confirmPassword}
onChange={handleChange}
autoComplete="new-password"
icon={Lock}
required
/>



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
from-blue-600
to-indigo-600
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



<p
className="
text-center
mt-6
text-sm
text-gray-500
dark:text-slate-300
"
>

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



</AuthLayout>


  );


}


export default Register;