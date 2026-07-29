
import { createContext, useState, useEffect } from "react";

const CreditCardContext = createContext();

export function CreditCardProvider({ children }) {

      const [isLoaded, setIsLoaded] = useState(false);
    const [creditCards, setCreditCards] = useState([]);

  useEffect(() => {
    console.log("Saving:", creditCards);

    if (isLoaded) {
      localStorage.setItem("creditCards", JSON.stringify(creditCards));
    }
  }, [creditCards]);

  useEffect(() => {
    //pangloading
    const savedCreditCards = localStorage.getItem("creditCards");

    if (savedCreditCards) {
      const parsedCreditCards = JSON.parse(savedCreditCards);

      setCreditCards(parsedCreditCards);
    }

    setIsLoaded(true);
  }, []);





      function addCreditCard(card) {

        setCreditCards((prev) => [
            ...prev,
            card
        ]);

    }

 function deleteCreditCard(id) {

    setCreditCards((prev) =>
        prev.filter((card) => card.id !== id)
    );

    }

    function updateCreditCard(updatedCard) {

    setCreditCards((prev) =>
        prev.map((card) =>
            card.id === updatedCard.id
                ? updatedCard
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
