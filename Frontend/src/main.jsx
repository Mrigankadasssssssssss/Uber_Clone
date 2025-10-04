import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/UserContext.jsx";
import DriverContext from "./context/DriverContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DriverContext>
      <UserContext>
        <App />
      </UserContext>
    </DriverContext>
  </StrictMode>
);
