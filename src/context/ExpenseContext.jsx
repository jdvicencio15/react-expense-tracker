import { createContext, useState, useEffect } from "react";

import formatMonthYear from "../utils/formatMonthYear";
import formatDate from "../utils/formatDate";

import {
  getExpenses,
  addExpense as apiAddExpense,
  deleteExpense as apiDeleteExpense,
  updateExpense as apiUpdateExpense,
} from "../api/expenseApi";


const ExpenseContext = createContext();


export function ExpenseProvider({ children }) {

  // Store all expenses fetched from backend
  const [expenses, setExpenses] = useState([]);


  // Filter states
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [searchTerm, setSearchTerm] = useState("");


  // Fetch expenses from API when app loads
  async function fetchExpenses() {
    try {

      const data = await getExpenses();

      // API layer already returns result.data
      setExpenses(data);

    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  }


  useEffect(() => {
    fetchExpenses();
  }, []);



  // Add new expense
  async function addExpense(expense) {

    const savedExpense = await apiAddExpense(expense);


    setExpenses((prev) => [
      ...prev,
      savedExpense,
    ]);
  }



  // Delete expense by ID
  async function deleteExpense(id) {

    await apiDeleteExpense(id);


    setExpenses((prev) =>
      prev.filter(
        (expense) => expense._id !== id
      )
    );
  }



  // Update existing expense
  async function updateExpense(updatedExpense) {

    const savedExpense = await apiUpdateExpense(
      updatedExpense._id,
      updatedExpense
    );


    setExpenses((prev) =>
      prev.map((expense) =>
        expense._id === savedExpense._id
          ? savedExpense
          : expense
      )
    );
  }



  // Apply search and month filtering
  const selectedMonth = monthFilter;

  const search = searchTerm
    .trim()
    .toLowerCase();



  const filteredExpenses = expenses.filter((expense) => {

    const matchesSearch =
      expense.name
        .toLowerCase()
        .includes(search) ||

      (expense.category || "")
        .toLowerCase()
        .includes(search) ||

      formatDate(expense.date)
        .toLowerCase()
        .includes(search) ||

      expense.amount
        .toString()
        .includes(search) ||

      (expense.paymentMethod || "")
        .toLowerCase()
        .includes(search);



    const matchesMonth =
      selectedMonth === "All Months" ||
      formatMonthYear(expense.date) === selectedMonth;


    return matchesSearch && matchesMonth;
  });



  // Generate available months for filter dropdown
  const uniqueMonths = [
    ...new Set(
      expenses.map((expense) =>
        formatMonthYear(expense.date)
      )
    ),
  ].sort();



  return (
    <ExpenseContext.Provider
      value={{
        // Expense data
        expenses,
        filteredExpenses,
        uniqueMonths,


        // Filters
        monthFilter,
        setMonthFilter,

        searchTerm,
        setSearchTerm,


        // CRUD operations
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >

      {children}

    </ExpenseContext.Provider>
  );
}


export default ExpenseContext;