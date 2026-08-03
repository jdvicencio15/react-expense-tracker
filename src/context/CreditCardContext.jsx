import { createContext, useState, useEffect } from "react";

import {
  getCreditCards,
  addCreditCard as apiAddCreditCard,
  deleteCreditCard as apiDeleteCreditCard,
  updateCreditCard as apiUpdateCreditCard,
} from "../api/creditCardApi";


const CreditCardContext = createContext();


export function CreditCardProvider({ children }) {

  // Store credit card data from backend
  const [creditCards, setCreditCards] = useState([]);



  // Fetch credit cards when app loads
  async function fetchCreditCards() {

    try {

      const data = await getCreditCards();

      // API layer already returns actual data
      setCreditCards(data);

    } catch (error) {

      console.error(
        "Failed to fetch credit cards:",
        error
      );

    }
  }



  useEffect(() => {
    fetchCreditCards();
  }, []);




  // Add new credit card
  async function addCreditCard(card) {

    const savedCard = await apiAddCreditCard(card);


    setCreditCards((prev) => [
      ...prev,
      savedCard,
    ]);
  }




  // Delete credit card by ID
  async function deleteCreditCard(id) {

    await apiDeleteCreditCard(id);


    setCreditCards((prev) =>
      prev.filter(
        (card) => card._id !== id
      )
    );
  }




  // Update existing credit card
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
        // Data
        creditCards,


        // CRUD operations
        addCreditCard,
        deleteCreditCard,
        updateCreditCard,
      }}
    >

      {children}

    </CreditCardContext.Provider>
  );
}


export default CreditCardContext;