import { apiRequest } from "./apiClient";


// Get all expenses
export async function getExpenses() {

  const result = await apiRequest("/api/expenses");

  return result.data;
}



// Add expense
export async function addExpense(expense) {

  const result = await apiRequest("/api/expenses", {
    method: "POST",

    body: JSON.stringify(expense),
  });


  return result.data;
}



// Delete expense
export async function deleteExpense(id) {

  const result = await apiRequest(`/api/expenses/${id}`, {
    method: "DELETE",
  });


  return result.data;
}



// Update expense
export async function updateExpense(id, expense) {

  const result = await apiRequest(`/api/expenses/${id}`, {
    method: "PUT",

    body: JSON.stringify(expense),
  });


  return result.data;
}