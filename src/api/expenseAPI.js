import { getToken } from "../utils/auth";


const API_URL = "http://localhost:5000/api/expenses";


// Get all expenses
export async function getExpenses() {

  const token = getToken();

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }


  const result = await response.json();

  return result.data;
}



// Add expense
export async function addExpense(expense) {

  const token = getToken();

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(expense),
  });


  if (!response.ok) {
    throw new Error("Failed to add expense");
  }


  const result = await response.json();

  return result.data;
}



// Delete expense
export async function deleteExpense(id) {

  const token = getToken();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }


  const result = await response.json();

  return result.data;
}



// Update expense
export async function updateExpense(id, expense) {

  const token = getToken();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(expense),
  });


  if (!response.ok) {
    throw new Error("Failed to update expense");
  }


  const result = await response.json();

  return result.data;
}