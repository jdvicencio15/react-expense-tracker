import { PieChart } from "lucide-react";

import useExpenses from "../hooks/useExpenses";

function CategorySummary() {
  const { filteredExpenses } = useExpenses();

  // Calculate total spending per category
  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    const category = expense.category;

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += Number(expense.amount);

    return acc;
  }, {});

  // Calculate total expense across all categories
  const totalCategoryExpenses = Object.values(categoryTotals).reduce(
    (total, amount) => total + amount,
    0,
  );

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md p-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
          <PieChart size={24} className="text-blue-600 dark:text-blue-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Category Summary
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Spending breakdown by category.
          </p>
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-4">
        {Object.entries(categoryTotals).map(([category, amount]) => {
          // Calculate category percentage
          const percentage =
            totalCategoryExpenses > 0
              ? Math.round((amount / totalCategoryExpenses) * 100)
              : 0;

          return (
            <div
              key={category}
              className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {category}
                </span>

                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ₱{amount.toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {percentage}%
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CategorySummary;
