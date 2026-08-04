const API_URL = "http://localhost:5000/api/budget";


// Get current budget
export async function getBudget() {

  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (!response.ok) {
    throw new Error("Failed to fetch budget");
  }


  const result = await response.json();

  return result.data;
}



// Create or update budget
export async function saveBudget(amount) {

  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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