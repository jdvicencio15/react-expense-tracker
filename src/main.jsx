import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ExpenseProvider } from "./context/ExpenseContext.jsx";
import { CreditCardProvider } from "./context/CreditCardContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ExpenseProvider>
        <CreditCardProvider>
          <App />
        </CreditCardProvider>
      </ExpenseProvider>
    </AuthProvider>
  </StrictMode>
);