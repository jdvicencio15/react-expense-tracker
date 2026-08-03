const API_URL = "http://localhost:5000/api/expenses";


// Get all expenses
export async function getExpenses() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }

  const result = await response.json();

  return result.data;
}


// Add expense
export async function addExpense(expense) {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });


  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }


  const result = await response.json();

  return result.data;
}


// Update expense
export async function updateExpense(id, expense) {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });


  if (!response.ok) {
    throw new Error("Failed to update expense");
  }


  const result = await response.json();

  return result.data;
}