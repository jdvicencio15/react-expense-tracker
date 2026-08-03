const API_URL = "http://localhost:5000/api/budget";


// Get current budget
export async function getBudget() {

  const response = await fetch(API_URL);


  if (!response.ok) {
    throw new Error("Failed to fetch budget");
  }


  const result = await response.json();

  return result.data;
}


// Create or update budget
export async function saveBudget(amount) {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
    }),
  });


  if (!response.ok) {
    throw new Error("Failed to save budget");
  }


  const result = await response.json();

  return result.data;
}