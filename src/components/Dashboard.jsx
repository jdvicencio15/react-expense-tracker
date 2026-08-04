import {
  LayoutDashboard,
  PiggyBank,
  Wallet,
  Receipt,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import CreditCardSummary from "./CreditCardSummary";
import Card from "./Card";
import formatCurrency from "../utils/formatCurrency";

import useExpenses from "../hooks/useExpenses";


// Payment methods considered as cash expenses
const CASH_PAYMENT_METHODS = ["Cash", "Bank Transfer", "E-Wallet"];

function Dashboard({ budget, creditCards  }) {
  const { filteredExpenses } = useExpenses();

  // Check if there are expenses
  const hasExpenses = filteredExpenses.length > 0;

  // Calculate total cash expenses only
  const  totalExpenses = filteredExpenses.reduce((total, expense) => {
    if (CASH_PAYMENT_METHODS.includes(expense.paymentMethod)) {
      return total + Number(expense.amount);
    }

    return total;
  }, 0);

  // Remaining budget calculation
  const remainingBudget = budget - totalExpenses;

  // Find highest expense
  const highestExpense = hasExpenses
    ? filteredExpenses.reduce((max, expense) => {
        return Number(expense.amount) > Number(max.amount) ? expense : max;
      }, filteredExpenses[0])
    : null;

  // Find lowest expense
  const lowestExpense = hasExpenses
    ? filteredExpenses.reduce((lowest, expense) => {
        return Number(expense.amount) < Number(lowest.amount)
          ? expense
          : lowest;
      }, filteredExpenses[0])
    : null;

  // Dashboard summary cards data
  const summaryCards = [
    {
      icon: <PiggyBank size={26} />,
      title: "Monthly Budget",
      amount: budget > 0 ? formatCurrency(budget) : "No Budget Set",
      description: "Current Budget",
    },

    {
      icon: <Wallet size={26} />,
      title: "Remaining Budget",
      amount: formatCurrency(remainingBudget),
      description: "Available to spend",
    },

    {
      icon: <Receipt size={26} />,
      title: "Total Expenses",
      amount: formatCurrency(totalExpenses),
      description: "Total recorded expenses",
    },

    {
      icon: <TrendingUp size={26} />,
      title: "Highest Expense",
      amount: highestExpense
        ? formatCurrency(highestExpense.amount)
        : "No Expense",
      description: highestExpense ? highestExpense.name : "No record",
    },

    {
      icon: <TrendingDown size={26} />,
      title: "Lowest Expense",
      amount: lowestExpense
        ? formatCurrency(lowestExpense.amount)
        : "No Expense",
      description: lowestExpense ? lowestExpense.name : "No record",
    },
  ];

  return (
    <section className="overview-section">
      <div className="mb-6">
        <h2
          className="
      flex
      items-center
      gap-3
      text-2xl
      font-bold
      text-gray-800
      dark:text-white
      "
        >
          <LayoutDashboard size={28} className="text-blue-600" />
          Dashboard Overview
        </h2>

        <p
          className="
      text-gray-500
      dark:text-gray-400
      mt-1
      "
        >
          Quick summary of your finances.
        </p>
      </div>

   <div
  className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  gap-6
  "
>
  {summaryCards.map((card) => (
    <Card key={card.title} {...card} />
  ))}

  <CreditCardSummary
    creditCards={creditCards}
    expenses={filteredExpenses}
  />

</div>
    </section>
  );
}

export default Dashboard;
