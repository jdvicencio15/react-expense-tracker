// Git practice test

import { useState, useEffect } from "react";



import Header from "./components/Header";
import BudgetSetup from "./components/BudgetSetup";
import CreditCardManagement from "./components/CreditCardManagement";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";

import CategorySummary from "./components/CategorySummary";

import ExpenseChart from "./components/ExpenseChart";

import { getBudget } from "./api/budgetApi";


function App() {
  const [budget, setBudget] = useState(0);



  const [editingExpense, setEditingExpense] = useState(null);

  const [darkMode, setDarkMode] = useState(false);




useEffect(() => {

  async function fetchBudget() {
    try {

      const data = await getBudget();

      if (data) {
        setBudget(data.amount);
      }

    } catch (error) {
      console.log(error.message);
    }
  }


  fetchBudget();

}, []);
  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [darkMode]);

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="max-w-7xl mx-auto px-4 py-8 lg:px-6 space-y-8">
          <BudgetSetup budget={budget} setBudget={setBudget} />

          <Dashboard
  budget={budget}
/>

         <ExpenseChart  />

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
            <div className="xl:col-span-2">
         <ExpenseForm
  editingExpense={editingExpense}
  setEditingExpense={setEditingExpense}
/>
            </div>

            <div className="xl:col-span-3">
              <CreditCardManagement />
            </div>
          </div>

          <CategorySummary  />

          <ExpenseTable
  setEditingExpense={setEditingExpense}
/>
        </main>
      </div>
    </>
  );
}

export default App;
