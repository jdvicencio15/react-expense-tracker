import {
  CreditCard,
  Plus,
  Save,
  Pencil,
  Trash2,
  Calendar,
  Wallet,
} from "lucide-react";

import Swal from "sweetalert2";

import { useState, useContext } from "react";

import formatCurrency from "../utils/formatCurrency";

import CreditCardContext from "../context/CreditCardContext";
import ExpenseContext from "../context/ExpenseContext";



// Generate due day options (1-31)
const days = Array.from(
  { length: 31 },
  (_, index) => index + 1
);



function CreditCardManagement() {


  // Get expenses for credit card usage calculation
  const { expenses } = useContext(ExpenseContext);



  // Get credit card CRUD functions
  const {
    creditCards,
    addCreditCard,
    deleteCreditCard,
    updateCreditCard,
  } = useContext(CreditCardContext);




  // Form states
  const [creditCardName, setCreditCardName] = useState("");
  const [creditCardLimit, setCreditCardLimit] = useState("");
  const [creditCardDueDay, setCreditCardDueDay] = useState("");



  // Track selected card for editing
  const [editingCreditCard, setEditingCreditCard] = useState(null);





  // Clear form inputs
  function resetForm() {

    setCreditCardName("");
    setCreditCardLimit("");
    setCreditCardDueDay("");

  }





  // Load selected card data into form
  function handleEditCreditCard(id) {


    const card = creditCards.find(
      (card) => card._id === id
    );


    if (!card) {
      return;
    }


    setCreditCardName(card.cardName);
    setCreditCardLimit(card.creditLimit);
    setCreditCardDueDay(card.dueDay);

    setEditingCreditCard(card._id);

  }





  // Validate form inputs
  function validateInputs() {


    if (!creditCardName.trim()) {

      alert("Please enter credit card name");

      return false;

    }


    if (Number(creditCardLimit) <= 0) {

      alert("Credit Limit must be greater than 0");

      return false;

    }


    if (!creditCardDueDay) {

      alert("Please select Due Day");

      return false;

    }


    return true;

  }





  // Save or update credit card
  async function handleSaveCreditCard() {


    if (!validateInputs()) {
      return;
    }




    if (editingCreditCard) {


      const updatedCard = {

        _id: editingCreditCard,

        cardName: creditCardName,

        creditLimit: Number(creditCardLimit),

        dueDay: Number(creditCardDueDay),

      };



      await updateCreditCard(updatedCard);



    } else {



      const newCard = {

        cardName: creditCardName,

        creditLimit: Number(creditCardLimit),

        dueDay: Number(creditCardDueDay),

      };



      await addCreditCard(newCard);

    }



    setEditingCreditCard(null);

    resetForm();

  }





  // Calculate total expense used by a card
  function getCardUsed(cardName) {


    const cardExpenses = expenses.filter(
      (expense) =>
        expense.paymentMethod === cardName
    );



    return cardExpenses.reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    );

  }





  // Delete credit card with confirmation
  async function handleDeleteCreditCard(id) {


    const result = await Swal.fire({

      title: "Delete Credit Card?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#6b7280",

      confirmButtonText: "Yes, delete it!",

      cancelButtonText: "Cancel",

    });



    if (result.isConfirmed) {


      await deleteCreditCard(id);



      Swal.fire({

        icon: "success",

        title: "Deleted!",

        text: "Credit Card has been deleted.",

        timer: 1500,

        showConfirmButton: false,

      });

    }

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
                  value={creditCardName}
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
                  value={creditCardLimit}
                  onChange={(e) => setCreditCardLimit(e.target.value)}
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
                  value={creditCardDueDay}
                  onChange={(e) => setCreditCardDueDay(e.target.value)}
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
                  onClick={handleSaveCreditCard}
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
                    key={card._id}
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
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Usage
                        </span>
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
                        onClick={() => handleEditCreditCard(card._id)}
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
                        onClick={() => handleDeleteCreditCard(card._id)}
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
