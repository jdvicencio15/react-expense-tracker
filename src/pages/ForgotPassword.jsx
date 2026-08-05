import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Wallet,
} from "lucide-react";

import { forgotPassword } from "../api/authApi";


function ForgotPassword() {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [token, setToken] = useState("");
    const [copied, setCopied] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  async function handleSubmit(e) {

  e.preventDefault();

  setError("");
  setMessage("");
  setToken("");
  setCopied(false);

  try {

    setLoading(true);

    const data = await forgotPassword(email);

    setMessage(data.message);

    setToken(data.resetToken);


  } catch(error){

    setError(error.message);

  } finally {

    setLoading(false);

  }

}



return (

<div
className="
min-h-screen
flex
items-center
justify-center
px-4
bg-gradient-to-br
from-blue-50
via-white
to-blue-100
"
>


<div
className="
w-full
max-w-md
bg-white
rounded-3xl
shadow-xl
p-8
"
>



{/* LOGO */}

<div
className="
flex
justify-center
mb-5
"
>

<div
className="
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
"
>

<Wallet
size={42}
className="text-white"
/>

</div>

</div>




<h1
className="
text-center
text-3xl
font-bold
text-slate-900
"
>

AK's
<br/>
Expense Tracker V1

</h1>




<p
className="
text-center
mt-3
text-sm
text-gray-500
"
>

Reset your password and recover your account.

</p>





<h2
className="
text-2xl
font-bold
mt-8
mb-5
text-blue-600
"
>

Forgot Password?

</h2>





{
message && (

<div
className="
mb-4
p-3
rounded-xl
bg-green-100
text-green-600
text-sm
"
>

{message}

</div>

)

}





{
token && (

<div
className="
mb-4
p-4
rounded-xl
bg-blue-100
text-black-300
text-sm
break-all
"
>

<p className="font-semibold mb-2">
Reset Token:
</p>


<div className="bg-white p-3 rounded-lg border">

{token}

</div>


<button

type="button"

onClick={() => {

navigator.clipboard.writeText(token);

setCopied(true);


setTimeout(()=>{

setCopied(false);

},2000);


}}

className="
mt-3
w-full
py-2
rounded-lg
bg-blue-600
text-white
font-semibold
hover:bg-blue-700
transition
"

>

{
copied
?
"Token Copied ✓"
:
"Copy Token"
}

</button>



<button

type="button"

onClick={()=>navigate(`/reset-password/${token}`)}

className="
mt-3
w-full
py-2
rounded-lg
bg-gradient-to-r
from-purple-600
to-blue-600
text-white
font-semibold
hover:opacity-90
transition
"

>

Continue to Reset Password

</button>


</div>

)

}





{
error && (

<div
className="
mb-4
p-3
rounded-xl
bg-red-100
text-red-600
text-sm
"
>

{error}

</div>

)

}





<form
onSubmit={handleSubmit}
className="space-y-5"
>




<div
className="relative"
>


<Mail
size={20}
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"
/>




<input

type="email"

placeholder="Enter your email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full
pl-12
py-3
rounded-xl
border
border-gray-200
focus:outline-none
focus:ring-2
focus:ring-blue-500
"

required

/>


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
"Generating Token..."
:
"Send Reset Token"
}


</button>



</form>





<p
className="
text-center
mt-6
text-sm
text-gray-500
"
>

Remember your password?


<Link

to="/login"

className="
ml-2
text-blue-600
font-semibold
hover:underline
"

>

Back to Login

</Link>


</p>




</div>


</div>

);


}


export default ForgotPassword;