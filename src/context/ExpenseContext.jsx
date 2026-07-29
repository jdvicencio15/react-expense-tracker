
import { createContext, useState, useEffect } from "react";
import formatMonthYear from "../utils/formatMonthYear";
import formatDate from "../utils/formatDate";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {

    const [expenses, setExpenses] = useState([]);


      const [isLoaded, setIsLoaded] = useState(false);

const [monthFilter, setMonthFilter] = useState("All Months");
    const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {

    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    setIsLoaded(true);

  }, []);


  useEffect(() => {

    if (isLoaded) {
      localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
      );
    }

  }, [expenses, isLoaded]);

    function addExpense(expense) {
        setExpenses((prev) => [...prev, expense]);
    }


    function deleteExpense(id) {
        setExpenses((prev) =>
            prev.filter((expense) => expense.id !== id)
        );
    }


    function updateExpense(updatedExpense) {
        setExpenses((prev) =>
            prev.map((expense) =>
                expense.id === updatedExpense.id
                    ? updatedExpense
                    : expense
            )
        );
    }

    const selectedMonth = monthFilter;
const search = searchTerm.trim().toLowerCase();

const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
        expense.name.toLowerCase().includes(search) ||
        (expense.category || "").toLowerCase().includes(search) ||
        formatDate(expense.date).toLowerCase().includes(search) ||
        expense.amount.toString().includes(search) ||
        (expense.paymentMethod || "").toLowerCase().includes(search);

    const matchesMonth =
        selectedMonth === "All Months" ||
        formatMonthYear(expense.date) === selectedMonth;

    return matchesSearch && matchesMonth;
});

    const uniqueMonths = [...new Set(
    expenses.map(expense => formatMonthYear(expense.date))
    )].sort();


    return (
        <ExpenseContext.Provider
            value={{
                 expenses,
                filteredExpenses,
                uniqueMonths,

                monthFilter,
                setMonthFilter,

                searchTerm,
                setSearchTerm,

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