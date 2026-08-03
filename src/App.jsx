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
  // Store current budget value
  const [budget, setBudget] = useState(0);

  // Track expense being edited
  const [editingExpense, setEditingExpense] = useState(null);

  const [creditCards, setCreditCards] = useState([]);


  // Control application theme
  const [darkMode, setDarkMode] = useState(false);

  // Load budget from backend on startup
  useEffect(() => {
    async function fetchBudget() {
      try {
        const data = await getBudget();

        if (data) {
          setBudget(data.amount);
        }
      } catch (error) {
        console.error("Failed to fetch budget:", error.message);
      }
    }

    fetchBudget();
  }, []);

  // Apply dark mode class to HTML root
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main
        className="
        max-w-7xl
        mx-auto
        px-4
        py-8
        lg:px-6
        space-y-8
      "
      >
        <BudgetSetup budget={budget} setBudget={setBudget} />

        <Dashboard
          budget={budget}
        creditCards={creditCards}/>

        <ExpenseChart />

        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-5
          gap-8
          items-start
        "
        >
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

        <CategorySummary />

        <ExpenseTable setEditingExpense={setEditingExpense} />
      </main>
    </div>
  );
}

export default App;
