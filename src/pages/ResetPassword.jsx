import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Lock,
    Wallet,
} from "lucide-react";

import { resetPassword } from "../api/authApi";


function ResetPassword() {

    const navigate = useNavigate();




const [token, setToken] = useState("");

const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");


    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");



    async function handleSubmit(e){

        e.preventDefault();


        setError("");
        setSuccess("");

if(!token){

    setError("Reset token is required.");

    return;

        }


        if(password !== confirmPassword){

            setError("Passwords do not match.");

            return;

        }



        if(password.length < 6){

            setError(
                "Password must be at least 6 characters."
            );

            return;

        }



        try {


            setLoading(true);



            const response = await resetPassword(
                token,
                password
            );



           setSuccess(
    "Password reset successfully! Redirecting to login..."
);


setTimeout(()=>{

    navigate("/login");

},3000);



        }catch(error){

            setError(
                error.message
            );


        }finally{

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

Create a new password for your account.

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

Reset Password

</h2>






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





{
success && (

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

{success}

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

<Lock
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

type="text"

placeholder="Paste reset token"

value={token}

onChange={(e)=>setToken(e.target.value)}

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

/>


</div>


<div
className="relative"
>

<Lock
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

type="password"

placeholder="New password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

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

/>


</div>






<div
className="relative"
>


<Lock
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

type="password"

placeholder="Confirm new password"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

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

/>


</div>







<button

type="submit"

disabled={loading || success}

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
"Updating password..."
:
"Reset Password"
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

Login

</Link>


</p>



</div>


</div>

);


}


export default ResetPassword;