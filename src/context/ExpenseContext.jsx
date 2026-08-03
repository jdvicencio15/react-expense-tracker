
import { createContext, useState, useEffect } from "react";
import formatMonthYear from "../utils/formatMonthYear";
import formatDate from "../utils/formatDate";
import {
  getExpenses,
  addExpense as apiAddExpense,
  deleteExpense as apiDeleteExpense,
  updateExpense as apiUpdateExpense
} from "../api/expenseApi";




const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {

    const [expenses, setExpenses] = useState([]);




const [monthFilter, setMonthFilter] = useState("All Months");
    const [searchTerm, setSearchTerm] = useState("");


  async function fetchExpenses() {
    try {
        const data = await getExpenses();
        setExpenses(data.data);
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
    fetchExpenses();
}, []);




 async function addExpense(expense) {

    const savedExpense = await apiAddExpense(expense);

    setExpenses((prev) => [
        ...prev,
        savedExpense
    ]);
}

async function deleteExpense(id) {

    await apiDeleteExpense(id);

    setExpenses((prev) =>
        prev.filter((expense) => expense._id !== id)
    );
}


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