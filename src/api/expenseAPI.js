const API_URL = "http://localhost:5000/api/expenses";

export async function getExpenses() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }

  return await response.json();
}

export async function addExpense(expense) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type":"application/json"},
    body: JSON.stringify(expense),

  });

  if (!response.ok) {
    throw new Error("Failed to add expense");
  }

  return await response.json();
}


export async function deleteExpense(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }

  return await response.json();
}


export async function updateExpense(id, expense) {

  const response = await fetch(`${API_URL}/${id}`, {
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(expense)
  });

  if(!response.ok){
    throw new Error("Failed to update expense");
  }

  return await response.json();
}