import {
  ReceiptText,
  Coins,
  Tag,
  CreditCard,
  Calendar,
  Plus,
  Save,
} from "lucide-react";

import Input from "./ui/Input";
import Button from "./ui/Button";
import Select from "./ui/Select";

import { useState, useEffect, useRef, useContext } from "react";

import CreditCardContext from "../context/CreditCardContext";
import useExpenses from "../hooks/useExpenses";

function ExpenseForm({ editingExpense, setEditingExpense }) {
  const { addExpense: addExpenseContext, updateExpense: updateExpenseContext } =
    useExpenses();

  // Form states
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expensePaymentMethod, setExpensePaymentMethod] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  // Focus expense name when editing
  const expenseNameRef = useRef(null);

  // Get available credit cards
  const { creditCards } = useContext(CreditCardContext);

  // Focus input when edit mode starts
  useEffect(() => {
    if (editingExpense && expenseNameRef.current) {
      expenseNameRef.current.focus();
    }
  }, [editingExpense]);

  // Load selected expense data into form
  useEffect(() => {
    if (editingExpense) {
      setExpenseName(editingExpense.name);

      setExpenseAmount(editingExpense.amount);

      setExpenseCategory(editingExpense.category);

      setExpensePaymentMethod(editingExpense.paymentMethod);

      setExpenseDate(editingExpense.date.split("T")[0]);
    }
  }, [editingExpense]);

  // Validate form inputs
  function validateForm() {
    if (!expenseName.trim()) {
      alert("Please enter expense name");

      return false;
    }

    if (Number(expenseAmount) <= 0) {
      alert("Amount must be greater than 0");

      return false;
    }

    if (!expenseCategory) {
      alert("Please select category");

      return false;
    }

    if (!expensePaymentMethod) {
      alert("Please select a payment method");

      return false;
    }

    if (!expenseDate) {
      alert("Please select date");

      return false;
    }

    return true;
  }

  // Add new expense
  async function handleAddExpense() {
    if (!validateForm()) {
      return;
    }

    const expense = {
      name: expenseName,

      amount: Number(expenseAmount),

      category: expenseCategory,

      paymentMethod: expensePaymentMethod,

      date: expenseDate,
    };

    await addExpenseContext(expense);

    resetForm();
  }

  // Decide whether add or update
  async function handleSubmit() {
    if (editingExpense) {
      if (!validateForm()) {
        return;
      }

      await handleUpdateExpense();
    } else {
      await handleAddExpense();
    }
  }

  // Clear form values
  function resetForm(clearEdit = false) {
    setExpenseName("");

    setExpenseAmount("");

    setExpenseCategory("");

    setExpensePaymentMethod("");

    setExpenseDate("");

    if (clearEdit) {
      setEditingExpense(null);
    }
  }

  // Update existing expense
  async function handleUpdateExpense() {
    const updatedExpense = {
      _id: editingExpense._id,

      name: expenseName,

      amount: Number(expenseAmount),

      category: expenseCategory,

      paymentMethod: expensePaymentMethod,

      date: expenseDate,
    };

    await updateExpenseContext(updatedExpense);

    resetForm(true);
  }

  return (
    <section className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
          <ReceiptText size={24} className="text-blue-600 dark:text-blue-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Add Expense
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Record a new expense
          </p>
        </div>
      </div>

      <form className="space-y-6 mt-8">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Expense Name
          </label>
          <div className="relative">
            <ReceiptText
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />

            <Input
              id="expense-name"
              ref={expenseNameRef}
              type="text"
              placeholder="e.g. Grocery"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="expense-amount"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Amount
          </label>

          <div className="relative">
            <Coins
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />

            <Input
              id="expense-amount"
              type="number"
              placeholder="0.00"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="expense-category"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Category
          </label>

          <div className="relative">
            <Tag
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
            />

            <Select
              id="expense-category"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
            >
              <option value="">Select Category</option>
             <option value="Groceries">Groceries</option>
<option value="Baby">Baby Expenses</option>
<option value="Transportation">Transportation</option>
<option value="Bills">Bills</option>
<option value="Housing">Housing</option>
<option value="Healthcare">Healthcare</option>
<option value="Education">Education</option>
<option value="Loan Payment">Loan Payment</option>
<option value="Shopping">Shopping</option>
<option value="Entertainment">Entertainment</option>
<option value="Others">Others</option>
            </Select>
          </div>
        </div>

        <div>
          <label
            htmlFor="expense-paymentmethod"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Payment Method
          </label>

          <div className="relative">
            <CreditCard
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
            />

            <Select
              id="expense-paymentmethod"
              value={expensePaymentMethod}
              onChange={(e) => setExpensePaymentMethod(e.target.value)}
            >
              <option value="">Select Mode of Payment</option>

              <option value="Cash">Cash</option>

              <option value="Bank Transfer">Bank Transfer</option>

              <option value="E-Wallet">E-Wallet</option>

              {creditCards.map((card) => (
                <option key={card._id} value={card.cardName}>
                  {card.cardName}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <label
            htmlFor="expense-date"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Date
          </label>

          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
            />

            <Input
              id="expense-date"
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          className="
    w-full
    py-3
    font-semibold
    shadow-sm
    dark:shadow-slate-900/50
    flex
    items-center
    justify-center
    gap-2
  "
        >
          {editingExpense ? (
            <>
              <Save size={18} />
              Save Changes
            </>
          ) : (
            <>
              <Plus size={18} />
              Add Expense
            </>
          )}
        </Button>
      </form>
    </section>
  );
}

export default ExpenseForm;
