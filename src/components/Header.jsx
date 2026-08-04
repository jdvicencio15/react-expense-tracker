
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Header({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

const { user, logout } = useAuth();


function handleLogout() {

  logout();

  navigate("/login");

  }

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b dark:border-slate-700">

  <div className="
    max-w-7xl
    mx-auto
    px-4
    py-6
    flex
    flex-col
    md:flex-row
    md:items-center
    md:justify-between
    gap-4
  ">

    {/* Brand */}
    <div>

      <h1 className="
        flex
        items-center
        gap-3
        text-3xl
        font-bold
        text-gray-800
        dark:text-white
      ">

        <Wallet
          className="text-blue-600"
          size={34}
        />

        AK's Expense Tracker V1

      </h1>


    <p className="
  text-gray-500
  dark:text-slate-400
  mt-2
">
  Track your personal finances with ease.
</p>

 <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="
          rounded-lg
          bg-slate-200
          px-4
          py-2
          hover:bg-slate-300
          transition
          dark:bg-slate-700
          dark:text-white
          dark:hover:bg-slate-600
        "
      >

        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}

      </button>


    </div>


    {/* Actions */}
    <div className="
      flex
      items-center
      gap-3
    ">


{user && (
  <p className="
    mt-3
    text-xl
    font-medium
     text-gray-500
    dark:text-white
  ">
    Welcome back, {user.firstName} 👋
  </p>
)}




      <button
        onClick={handleLogout}
        className="
          px-4
          py-2
          rounded-lg
          bg-red-500
          text-white
          hover:bg-red-600
          transition
        "
      >

        Logout

      </button>


    </div>


  </div>

</header>
);
}

export default Header;