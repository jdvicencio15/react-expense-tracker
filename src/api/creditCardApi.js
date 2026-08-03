const API_URL = "http://localhost:5000/api/creditcards";


// Get all credit cards
export async function getCreditCards() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch credit cards");
  }

  const result = await response.json();

  return result.data;
}


// Add credit card
export async function addCreditCard(creditCard) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });


  if (!response.ok) {
    throw new Error("Failed to delete credit card");
  }


  const result = await response.json();

  return result.data;
}


// Update credit card
export async function updateCreditCard(id, creditCard) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creditCard),
  });


  if (!response.ok) {
    throw new Error("Failed to update credit card");
  }


  const result = await response.json();

  return result.data;
}