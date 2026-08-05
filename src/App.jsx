import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


import Header from "./components/Header";
import BudgetSetup from "./components/BudgetSetup";
import CreditCardManagement from "./components/CreditCardManagement";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";

import ProtectedRoute from "./components/ProtectedRoute";

import CategorySummary from "./components/CategorySummary";
import ExpenseChart from "./components/ExpenseChart";

import { getBudget } from "./api/budgetApi";
import { useAuth } from "./context/AuthContext";

function DashboardPage() {
  const { token } = useAuth();

  const [budget, setBudget] = useState(0);

  const [editingExpense, setEditingExpense] = useState(null);

  const [creditCards, setCreditCards] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

useEffect(() => {

  async function fetchBudget() {

    try {

      const data = await getBudget();

      if (data) {
        setBudget(data.amount);
      } else {
        setBudget(0);
      }

    } catch (error) {

      console.error(
        "Failed to fetch budget:",
        error.message
      );

    }

  }


  if (token) {
    fetchBudget();
  } else {
    setBudget(0);
  }


}, [token]);

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

        <Dashboard budget={budget} creditCards={creditCards} />

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

       <Route
 path="/reset-password/:token"
 element={<ResetPassword />}
/>

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
