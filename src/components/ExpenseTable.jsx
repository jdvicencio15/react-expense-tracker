import formatCurrency from "../utils/formatCurrency";
import formatDate from "../utils/formatDate";

import useExpenses from "../hooks/useExpenses";
import { useState, useEffect } from "react";

import Swal from "sweetalert2";

function ExpenseTable({

  setEditingExpense
}) {



 const {
  expenses,
  filteredExpenses,
  monthFilter,
  setMonthFilter,
  searchTerm,
  setSearchTerm,
  deleteExpense,
  uniqueMonths,
} = useExpenses();



  const hasExpenses = filteredExpenses.length > 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");

  const expensesPerPage = 5;

  const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage);
const startItem = (currentPage - 1) * expensesPerPage + 1;

const endItem = Math.min(
  currentPage * expensesPerPage,
  filteredExpenses.length
  );


  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [currentPage, totalPages]);

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "highest") {
      return Number(b.amount) - Number(a.amount);
    }

    if (sortBy === "lowest") {
      return Number(a.amount) - Number(b.amount);
    }

    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    }

    if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }

    return 0;
  });

  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;

  const currentExpenses = sortedExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, monthFilter]);

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  console.log("expenses:", expenses);
console.log("filteredExpenses:", filteredExpenses);
console.log("currentExpenses:", currentExpenses);



  async function handleDeleteExpense(id) {
  const result = await Swal.fire({
    title: "Delete Expense?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    await deleteExpense(id);

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Expense has been deleted.",
      timer: 1500,
      showConfirmButton: false,
    });
  }
}




  return (
    <section className="max-w-7xl mx-auto mt-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Transactions
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View and manage your recorded expenses.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <input
            className="
w-full lg:w-80
border border-gray-300 dark:border-slate-600
rounded-xl
px-4 py-2
bg-white dark:bg-slate-800
text-gray-700 dark:text-white
placeholder:text-gray-400 dark:placeholder:text-gray-500
outline-none
focus:ring-2
focus:ring-blue-500
"
            type="text"
            placeholder="🔍 Search expense..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-col lg:flex-row gap-4">
            <select
              className="
border border-gray-300 dark:border-slate-600
rounded-xl
px-4 py-2
bg-white dark:bg-slate-800
text-gray-700 dark:text-white
outline-none
focus:ring-2
focus:ring-blue-500
"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              <option value="All Months">All Months</option>

              {uniqueMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select
              className="
  border
  border-gray-300
  dark:border-slate-600
  rounded-xl
  px-4
  py-2
  bg-white
  dark:bg-slate-800
  text-gray-700
  dark:text-white
  placeholder:text-gray-400
  dark:placeholder:text-gray-500
  outline-none
  focus:ring-2
  focus:ring-blue-500
"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="newest">Newest</option>

              <option value="oldest">Oldest</option>

              <option value="highest">Highest Amount</option>

              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr className="uppercase text-xs tracking-wider text-gray-500 dark:text-gray-400">
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {!hasExpenses ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400">
                      <div className="text-4xl mb-3">📂</div>

                      <p className="text-lg font-semibold dark:text-white">
                        No expenses found
                      </p>

                      <p className="text-sm">
                        Start tracking your expenses today.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="
border-b
border-gray-200
dark:border-slate-700
hover:bg-gray-50
dark:hover:bg-slate-800
transition
"
                  >
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                      {expense.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-xs font-medium px-3 py-1">
                        {expense.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingExpense(expense)}
                          className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 transition"
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                            onClick={() => handleDeleteExpense(expense._id)}
                          className="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        <div
  className="
    flex
    justify-center
    items-center
    gap-2
    mt-6
  "
>
  <button
  onClick={() => setCurrentPage((prev) => prev - 1)}
  disabled={currentPage === 1}
  className="
    px-4
    py-2
    rounded-lg
    bg-slate-800
    text-gray-300
    border
    border-slate-700
    hover:bg-slate-700
    transition
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  Previous
</button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
  key={index}
  onClick={() => setCurrentPage(index + 1)}
  className={`
    px-3 py-1 rounded-lg
    font-medium
    transition-all duration-200
    ${
      currentPage === index + 1
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
        : `
          bg-gray-200
          dark:bg-slate-700
          text-gray-700
          dark:text-gray-200
          hover:bg-gray-300
          dark:hover:bg-slate-600
        `
    }
  `}
>
  {index + 1}
</button>
              ))}
            </div>

            <button
  onClick={() => setCurrentPage((prev) => prev + 1)}
  disabled={currentPage === totalPages}
  className="
    px-4
    py-2
    rounded-lg
    bg-slate-800
    text-gray-300
    border
    border-slate-700
    hover:bg-slate-700
    transition
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  Next
</button>
          </div>

         <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
  Showing {startItem}-{endItem}  of {filteredExpenses.length} transactions
</div>
        </div>
      </div>
    </section>
  );
}

export default ExpenseTable;
