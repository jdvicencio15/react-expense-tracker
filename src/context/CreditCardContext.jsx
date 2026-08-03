
import { createContext, useState, useEffect } from "react";

import {
  getCreditCards,
  addCreditCard as apiAddCreditCard,
  deleteCreditCard as apiDeleteCreditCard,
  updateCreditCard as apiUpdateCreditCard,
} from "../api/creditCardApi";



const CreditCardContext = createContext();

export function CreditCardProvider({ children }) {


    const [creditCards, setCreditCards] = useState([]);



async function fetchCreditCards() {
  try {
    const data = await getCreditCards();

    setCreditCards(data);
  } catch (error) {
    console.error(error);
  }
  }



  useEffect(() => {
  fetchCreditCards();
}, []);



async function addCreditCard(card) {

  const savedCard = await apiAddCreditCard(card);

  setCreditCards((prev) => [
    ...prev,
    savedCard
  ]);
}

async function deleteCreditCard(id) {

    await apiDeleteCreditCard(id);

    setCreditCards((prev) =>
        prev.filter((card) => card._id !== id)
    );
}

async function updateCreditCard(updatedCreditCard) {

    const savedCreditCard = await apiUpdateCreditCard(
        updatedCreditCard._id,
        updatedCreditCard
    );

    setCreditCards((prev) =>
        prev.map((card) =>
            card._id === savedCreditCard._id
                ? savedCreditCard
                : card
        )
    );
}




  return (
        <CreditCardContext.Provider
          value={{
                creditCards,
              addCreditCard,
              deleteCreditCard,
                   updateCreditCard
            }}
        >
            {children}
        </CreditCardContext.Provider>
    );
}


export default CreditCardContext;
