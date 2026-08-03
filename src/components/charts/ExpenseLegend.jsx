import formatCurrency from "../../utils/formatCurrency";
import { CHART_COLORS } from "../../constants/chartColors";

function ExpenseLegend({ chartData, activeIndex, setActiveIndex }) {
  return (
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
                  backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
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
  );
}

export default ExpenseLegend;
