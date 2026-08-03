const API_URL = "http://localhost:5000/api/budget";


export async function getBudget() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch budget");
  }

  return await response.json();
}


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


  return await response.json();
}