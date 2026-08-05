import { apiRequest } from "./apiClient";


// Get all credit cards
export async function getCreditCards() {

  const result = await apiRequest("/api/creditcards");

  return result.data;
}



// Add credit card
export async function addCreditCard(creditCard) {

  const result = await apiRequest("/api/creditcards", {
    method: "POST",

    body: JSON.stringify(creditCard),
  });


  return result.data;
}



// Delete credit card
export async function deleteCreditCard(id) {

  const result = await apiRequest(`/api/creditcards/${id}`, {
    method: "DELETE",
  });


  return result.data;
}



// Update credit card
export async function updateCreditCard(id, creditCard) {

  const result = await apiRequest(`/api/creditcards/${id}`, {
    method: "PUT",

    body: JSON.stringify(creditCard),
  });


  return result.data;
}