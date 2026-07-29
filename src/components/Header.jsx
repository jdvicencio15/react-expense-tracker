
import { Wallet } from "lucide-react";


function Header({darkMode, setDarkMode }) {
  return (
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b dark:border-slate-700">

    <div className="max-w-7xl mx-auto px-4 py-6">

      <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800 dark:text-white">

            <Wallet className="text-blue-600" size={34} />

                        Vicencio's Expense Tracker

        </h1>

       <p className="text-gray-500 dark:text-slate-400 mt-2">
            Track your personal finances with ease.
              </p>

              <button
  onClick={() => setDarkMode((prev) => !prev)}
  className="mt-4 rounded-lg bg-slate-200 px-4 py-2 dark:bg-slate-700 dark:text-white"
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>


    </div>
</header>
);
}

export default Header;