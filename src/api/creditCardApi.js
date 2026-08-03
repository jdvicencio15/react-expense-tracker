const API_URL = "http://localhost:5000/api/creditcards";

export async function getCreditCards() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch credit cards");
  }

  return await response.json();
}

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

  return await response.json();
}

export async function deleteCreditCard(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete credit card");
  }

  return await response.json();
}

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

  return await response.json();
}