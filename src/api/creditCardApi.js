import { getToken } from "../utils/auth";


const API_URL = "http://localhost:5000/api/creditcards";


// Get all credit cards
export async function getCreditCards() {

 const token = getToken();

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (!response.ok) {
    throw new Error("Failed to fetch credit cards");
  }


  const result = await response.json();

  return result.data;
}



// Add credit card
export async function addCreditCard(creditCard) {

const token = getToken();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(creditCard),
  });


  if (!response.ok) {
    throw new Error("Failed to add credit card");
  }


  const result = await response.json();

  return result.data;
}



// Delete credit card
export async function deleteCreditCard(id) {

  const token = getToken();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (!response.ok) {
    throw new Error("Failed to delete credit card");
  }


  const result = await response.json();

  return result.data;
}



// Update credit card
export async function updateCreditCard(id, creditCard) {

  const token = getToken();

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(creditCard),
  });


  if (!response.ok) {
    throw new Error("Failed to update credit card");
  }


  const result = await response.json();

  return result.data;
}