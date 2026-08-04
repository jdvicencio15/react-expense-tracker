const API_URL = "http://localhost:5000/api";


export async function apiRequest(
  endpoint,
  options = {}
) {

  const token = localStorage.getItem("token");


  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...(token && {
          Authorization: `Bearer ${token}`,
        }),

        ...options.headers,
      },
    }
  );


  const result = await response.json();


  if (!response.ok) {
    throw new Error(
      result.message || "Request failed"
    );
  }


  return result;

}