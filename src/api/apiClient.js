import { getToken, removeToken } from "../utils/auth";

import toast from "react-hot-toast";


const API_URL = import.meta.env.VITE_API_URL;





export async function apiRequest(
  endpoint,
  options = {}
) {

const token = getToken();


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


 const result = await response.json().catch(() => ({}));


if (!response.ok) {

  if (response.status === 401) {

  removeToken();

  toast.error("Session expired. Please login again.");

  setTimeout(() => {
    window.location.href = "/login";
  }, 2000);

  return;
}


  toast.error(
    result.message || "Request failed"
  );


  throw new Error(
    result.message || "Request failed"
  );
}

  return result;

}

export default API_URL;
