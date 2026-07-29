import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";

function useExpenses() {
    return useContext(ExpenseContext);
}

export default useExpenses;