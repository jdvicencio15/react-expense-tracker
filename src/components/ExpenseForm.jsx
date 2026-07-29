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

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expensePaymentMethod, setExpensePaymentMethod] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  const expenseNameRef = useRef(null);

  const { creditCards } = useContext(CreditCardContext);

  useEffect(() => {
    if (editingExpense && expenseNameRef.current) {
      expenseNameRef.current.focus();
    }
  }, [editingExpense]);

  useEffect(() => {
    if (editingExpense) {
      setExpenseName(editingExpense.name);
      setExpenseAmount(editingExpense.amount);
      setExpenseCategory(editingExpense.category);
      setExpensePaymentMethod(editingExpense.paymentMethod);
      setExpenseDate(editingExpense.date);
    }
  }, [editingExpense]);

  function checkInputs() {
    if (expenseName === "") {
      alert("Please enter expense name");

      return;
    }
    if (expenseAmount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    if (expenseCategory === "") {
      alert("Please select category");
      return;
    }
    if (expensePaymentMethod === "") {
      alert("Please select a payment method");
      return;
    }
    if (expenseDate === "") {
      alert("Please select date");
      return;
    }

    return true;
  }

  function handleAddExpense() {
    if (!checkInputs()) {
      return;
    }

    const expense = {
      id: Date.now(),
      name: expenseName,
      amount: Number(expenseAmount),
      category: expenseCategory,
      paymentMethod: expensePaymentMethod,
      date: expenseDate,
    };

    addExpenseContext(expense);

    resetForm();
  }

  function handleSubmit() {
    if (editingExpense) {
      if (!checkInputs()) return;

      handleUpdateExpense();
    } else {
      handleAddExpense();
    }
  }

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

  function handleUpdateExpense() {
    const updatedExpense = {
      id: editingExpense.id,
      name: expenseName,
      amount: Number(expenseAmount),
      category: expenseCategory,
      paymentMethod: expensePaymentMethod,
      date: expenseDate,
    };

    updateExpenseContext(updatedExpense);

    resetForm(true);
  }

  return (
    <section className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700 p-6">

  <div className="flex items-center gap-3 mb-8">

    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
      <ReceiptText
        size={24}
        className="text-blue-600 dark:text-blue-400"
      />
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
  onChange={(e)=>setExpenseName(e.target.value)}
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
      <option value="Food">Food</option>
      <option value="Transportation">Transportation</option>
      <option value="Bills">Bills</option>
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

      <option value="">
        Select Mode of Payment
      </option>

      <option value="Cash">
        Cash
      </option>

      <option value="Bank Transfer">
        Bank Transfer
      </option>

      <option value="E-Wallet">
        E-Wallet
      </option>


      {creditCards.map((card) => (
        <option key={card.id} value={card.cardName}>
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
  ">
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
