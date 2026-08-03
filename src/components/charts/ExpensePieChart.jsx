import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";

import formatCurrency from "../../utils/formatCurrency";
import { CHART_COLORS } from "../../constants/chartColors";

function ExpensePieChart({
  chartData,
  totalExpenses,
  activeIndex,
  setActiveIndex,
}) {
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

  return (
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
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
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

        <Tooltip formatter={(value) => formatCurrency(value)} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ExpensePieChart;
