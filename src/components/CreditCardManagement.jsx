import {
  CreditCard,
  Plus,
  Save,
  Pencil,
  Trash2,
  Calendar,
  Wallet,
} from "lucide-react";

import { useState, useContext } from "react";
import formatCurrency from "../utils/formatCurrency";
import CreditCardContext from "../context/CreditCardContext";
import ExpenseContext from "../context/ExpenseContext";

const days = [];

for (let i = 1; i <= 31; i++) {
  days.push(i);
}

function CreditCardManagement() {
  const { expenses } = useContext(ExpenseContext);

  const { creditCards, addCreditCard, deleteCreditCard, updateCreditCard } =
    useContext(CreditCardContext);

  const [creditcardName, setcreditcardName] = useState("");
  const [creditcardLimit, setcreditcardLimit] = useState("");
  const [creditcardDueDay, setcreditcardDueDay] = useState("");

  const [editingCreditCard, setEditingCreditCard] = useState(null);

  function resetForm() {
    setcreditcardName("");
    setcreditcardLimit("");
    setcreditcardDueDay("");
  }

  function handleEditCreditCard(id) {
    const card = creditCards.find((card) => card.id === id);

    if (!card) {
      return;
    }

    setcreditcardName(card.cardName);
    setcreditcardLimit(card.creditLimit);
    setcreditcardDueDay(card.dueDay);
    setEditingCreditCard(card.id);
  }

  function checkInputs() {
    if (creditcardName === "") {
      alert("Please enter credit card name");

      return;
    }
    if (creditcardLimit <= 0) {
      alert("Credit Limit must be greater than 0");
      return;
    }

    if (creditcardDueDay === "") {
      alert("Please select Due Day");
      return;
    }

    return true;
  }

  function creditCardSaveButton() {
    if (!checkInputs()) {
      return;
    }

    if (editingCreditCard !== null) {
      const updatedCard = {
        id: editingCreditCard,
        cardName: creditcardName,
        creditLimit: Number(creditcardLimit),
        dueDay: Number(creditcardDueDay),
      };

      updateCreditCard(updatedCard);

      setEditingCreditCard(null);
      resetForm();
    } else {
      const creditCard = {
        id: Date.now(),
        cardName: creditcardName,
        creditLimit: Number(creditcardLimit),
        dueDay: Number(creditcardDueDay),
      };

      addCreditCard(creditCard);

      resetForm();
    }
  }

  function getCardUsed(cardName) {
    const cardExpenses = expenses.filter(
      (expense) => expense.paymentMethod === cardName,
    );

    const totalUsed = cardExpenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0,
    );

    return totalUsed;
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white">
            <CreditCard
              size={28}
              className="text-blue-600 dark:text-blue-400"
            />
            Credit Card Management
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Add and manage your credit cards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-1">
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Card Name
                </label>

                <input
                  type="text"
                  placeholder="Enter card name"
                  value={creditcardName}
                  onChange={(e) => setcreditcardName(e.target.value)}
                  className="
            w-full
            rounded-lg
            border
            border-gray-300
            dark:border-slate-600
            bg-white
            dark:bg-slate-800
            px-4
            py-2
            text-gray-700
            dark:text-white
            placeholder:text-gray-400
            dark:placeholder:text-gray-500
            focus:ring-2
            focus:ring-blue-500
            focus:outline-none
          "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Credit Limit
                </label>

                <input
                  type="number"
                  placeholder="Enter credit limit"
                  value={creditcardLimit}
                  onChange={(e) => setcreditcardLimit(e.target.value)}
                  className="
            w-full
            rounded-lg
            border
            border-gray-300
            dark:border-slate-600
            bg-white
            dark:bg-slate-800
            px-4
            py-2
            text-gray-700
            dark:text-white
            placeholder:text-gray-400
            dark:placeholder:text-gray-500
            focus:ring-2
            focus:ring-blue-500
            focus:outline-none
          "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Due Day
                </label>

                <select
                  value={creditcardDueDay}
                  onChange={(e) => setcreditcardDueDay(e.target.value)}
                  className="
            w-full
            rounded-lg
            border
            border-gray-300
            dark:border-slate-600
            bg-white
            dark:bg-slate-800
            px-4
            py-2
            text-gray-700
            dark:text-white
            focus:ring-2
            focus:ring-blue-500
            focus:outline-none
          "
                >
                  <option value="">Select Day</option>

                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={creditCardSaveButton}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition flex justify-center items-center gap-2"
              >
                {editingCreditCard ? (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Save Card
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2">
            <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              <Wallet size={22} className="text-blue-600 dark:text-blue-400" />
              Saved Credit Cards
            </h3>

            <div className="space-y-4">
              {creditCards.map((card) => {
                const used = Number(getCardUsed(card.cardName));
                const limit = Number(card.creditLimit);

                const usagePercentage = limit > 0 ? (used / limit) * 100 : 0;

                const usageColor =
                  usagePercentage < 30
                    ? "bg-green-500"
                    : usagePercentage < 70
                      ? "bg-yellow-500"
                      : "bg-red-500";

                return (
                  <div
                    key={card.id}
                    className="
    border
    border-gray-200
    dark:border-slate-700
    bg-white
    dark:bg-slate-800
    rounded-xl
    p-5
    shadow-sm
    hover:shadow-md
    transition
  "
                  >
                    <h4 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white mb-3">
                      <CreditCard
                        size={20}
                        className="text-blue-600 dark:text-blue-400"
                      />

                      {card.cardName}
                    </h4>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Credit Limit:
                        </span>
                        <br />
                        {formatCurrency(card.creditLimit)}
                      </p>

                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="flex items-center gap-2 font-semibold">
                          <Calendar
                            size={16}
                            className="text-gray-500 dark:text-gray-400"
                          />
                          Due Day
                        </span>

                        {card.dueDay}
                      </p>



                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Used:</span>
                        <br />
                        {formatCurrency(used)}
                      </p>

                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Remaining:</span>
                        <br />
                        {formatCurrency(card.creditLimit - used)}
                      </p>
                    </div>

                     <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-semibold text-gray-800 dark:text-gray-200" >Usage</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                           {Math.round(usagePercentage)}%
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className={`${usageColor} h-3 rounded-full transition-all duration-500`}
                            style={{
                              width: `${Math.min(usagePercentage, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                    <div className="flex gap-3 mt-5">
                      <button
                        type="button"
                        onClick={() => handleEditCreditCard(card.id)}
                        className="
flex-1
border
border-blue-600
text-blue-600
dark:text-blue-400
hover:bg-blue-600
hover:text-white
py-2
rounded-lg
transition
flex
justify-center
items-center
gap-2
"
                      >
                        <Pencil size={18} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteCreditCard(card.id)}
                        className="
flex-1
border
border-red-600
text-red-600
dark:text-red-400
hover:bg-red-600
hover:text-white
py-2
rounded-lg
transition
flex
justify-center
items-center
gap-2
"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreditCardManagement;
