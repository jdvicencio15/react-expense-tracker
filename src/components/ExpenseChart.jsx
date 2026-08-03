import useExpenses from "../hooks/useExpenses";
import formatDate from "../utils/formatDate";
import { useState } from "react";

import { PieChart as PieChartIcon } from "lucide-react";

import ExpensePieChart from "./charts/ExpensePieChart";
import ExpenseLegend from "./charts/ExpenseLegend";

function ExpenseChart() {
  const { filteredExpenses } = useExpenses();

  const [activeIndex, setActiveIndex] = useState(-1);

  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    const category = expense.category;

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += Number(expense.amount);

    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      name: category,
      value: amount,
    }))
    .sort((a, b) => b.value - a.value);

  const totalExpenses = chartData.reduce(
    (total, item) => total + item.value,
    0,
  );

  const hasExpenses = chartData.length > 0;

  function exportCSV() {
    const headers = ["Date", "Expense", "Category", "Payment Method", "Amount"];

    const rows = filteredExpenses.map((expense) => [
      formatDate(expense.date),
      expense.name,
      expense.category,
      expense.paymentMethod,
      Number(expense.amount).toFixed(2),
    ]);

    const csvData = [headers, ...rows];

    const csvContent = csvData
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    const today = new Date().toISOString().split("T")[0];

    link.download = `expenses-${today}.csv`;

    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Expense Analytics
        </h2>

        <button
          onClick={exportCSV}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-lg
          transition
          "
        >
          Export CSV
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* LEFT - PIE CHART */}
        <div className="w-full lg:w-1/2">
          <div className="h-80">
            {hasExpenses ? (
              <ExpensePieChart
                chartData={chartData}
                totalExpenses={totalExpenses}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ) : (
              <div
                className="
              flex
              h-full
              flex-col
              items-center
              justify-center
              text-center
              "
              >
                <PieChartIcon
                  size={56}
                  className="text-gray-300 dark:text-gray-600"
                />

                <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
                  No expenses yet
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Add your first expense to see your spending analytics.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT - LEGEND */}
        {hasExpenses && (
          <ExpenseLegend
            chartData={chartData}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        )}
      </div>
    </section>
  );
}

export default ExpenseChart;
