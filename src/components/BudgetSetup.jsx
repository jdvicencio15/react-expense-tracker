import { useState, useEffect } from "react";
import { PiggyBank } from "lucide-react";
import { Save } from "lucide-react";
import { saveBudget } from "../api/budgetApi";


function BudgetSetup({ budget, setBudget }) {
  const [inputBudget, setInputBudget] = useState("");

  // Kapag may existing budget galing localStorage,
  // ilagay din sa input box
  useEffect(() => {
    if (budget) {
      setInputBudget(budget);
    }
  }, [budget]);

  async function handleSaveBudget() {
  try {

    const data = await saveBudget(Number(inputBudget));

    setBudget(data.amount);

    console.log("Saved budget:", data.amount);

    setInputBudget("");

  } catch (error) {

    console.log(error.message);

  }
}
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <section className="bg-white rounded-xl shadow-md p-6 dark:bg-slate-800">
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
            <PiggyBank className="text-blue-600" size={28} />
            Budget Setup
          </h2>

          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Set your monthly spending limit.
          </p>
        </div>

        <div className="space-y-4">
          <label
            htmlFor="budget-input"
            className="block text-sm font-medium text-gray-700 dark:text-slate-300"
          >
            Monthly Budget
          </label>

          <input
            id="budget-input"
            type="number"
            placeholder="Enter monthly budget"
            value={inputBudget}
            onChange={(e) => setInputBudget(e.target.value)}
            className="
  w-full
  rounded-lg
  border
  border-gray-300
  dark:border-slate-600
  bg-white
  dark:bg-slate-900
  text-gray-900
  dark:text-white
  placeholder:text-gray-400
  dark:placeholder:text-slate-400
  px-4
  py-2
  focus:outline-none
  focus:ring-2
focus:ring-blue-500
focus:border-blue-500
dark:focus:border-blue-500
  transition
"
          />

          <button
            onClick={handleSaveBudget}
            className="flex items-center justify-center gap-2 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            <Save size={18} />
            Save Budget
          </button>
        </div>
      </section>
    </div>
  );
}

export default BudgetSetup;
