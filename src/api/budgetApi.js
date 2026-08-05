import { apiRequest } from "./apiClient";


// Get current budget
export async function getBudget() {

  const result = await apiRequest("/api/budget");

  return result.data;
}



// Create or update budget
export async function saveBudget(amount) {

  const result = await apiRequest("/api/budget", {
    method: "POST",

    body: JSON.stringify({
      amount,
    }),
  });


  return result.data;
}