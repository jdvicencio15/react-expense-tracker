import { CreditCard } from "lucide-react";
import Card from "./Card";
import formatCurrency from "../utils/formatCurrency";

function CreditCardSummary({ expenses = [] }) {

  const creditCardExpenses = expenses.filter(
    (expense) =>
      !["Cash", "Bank Transfer", "E-Wallet"].includes(
        expense.paymentMethod
      )
  );

  const totalCreditCardSpending = creditCardExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  return (
    <Card
      icon={<CreditCard size={26} />}
      title="Credit Card Spending"
      amount={formatCurrency(totalCreditCardSpending)}
      description="Total credit card expenses"
    />
  );
}

export default CreditCardSummary;