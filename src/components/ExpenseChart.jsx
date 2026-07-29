import useExpenses from "../hooks/useExpenses";
import formatCurrency from "../utils/formatCurrency";
import { useState } from "react";
import formatDate from "../utils/formatDate";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";

import { PieChart as PieChartIcon } from "lucide-react";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

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

  function renderActiveShape(props) {
    return (
      <Sector
        {...props}
        outerRadius={props.outerRadius + 12}
        stroke="#fff"
        strokeWidth={3}
      />
    );
  }

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
          transition-colors
        "
        >
          Export CSV
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* LEFT - CHART */}
        <div className="w-full lg:w-1/2">
          <div className="h-80">
            {hasExpenses ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
  <Pie
    activeShape={renderActiveShape}
    activeIndex={activeIndex}
    onMouseEnter={(_, index) => setActiveIndex(index)}
    onMouseLeave={() => setActiveIndex(-1)}
    data={chartData}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={130}
    innerRadius={70}
    label={({ percent }) =>
      `${(percent * 100).toFixed(0)}%`
    }
  >
    {chartData.map((entry, index) => (
      <Cell
        key={entry.name}
        fill={COLORS[index % COLORS.length]}
      />
    ))}
  </Pie>


  <text
    x="50%"
    y="48%"
    textAnchor="middle"
    dominantBaseline="middle"
    className="fill-gray-800 dark:fill-white text-lg font-bold"
  >
    {formatCurrency(totalExpenses)}
  </text>


  <text
    x="50%"
    y="58%"
    textAnchor="middle"
    dominantBaseline="middle"
    className="fill-gray-500 dark:fill-gray-400 text-sm"
  >
    Total Expenses
  </text>


  <Tooltip
    formatter={(value) => formatCurrency(value)}
  />

</PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
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
          <div className="w-full lg:w-1/2">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Category Breakdown
            </h3>

            <div>
              {chartData.map((item, index) => (
                <div
                  key={item.name}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  className={`
                  flex justify-between items-center
                  py-3 px-2
                  rounded-lg
                  border-b border-gray-100 dark:border-slate-700
                  transition-all duration-200

                  ${
                    activeIndex === index
                      ? "bg-blue-50 dark:bg-blue-900/40 scale-[1.02]"
                      : "hover:bg-gray-50 dark:hover:bg-slate-800"
                  }
                `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />

                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {item.name}
                    </span>
                  </div>

                  <span className="font-semibold text-gray-800 dark:text-white">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExpenseChart;
