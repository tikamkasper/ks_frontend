// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CustomerApp from "./CustomerApp.jsx";
import SellerApp from "./SellerApp.jsx";
import { BrowserRouter } from "react-router";
const user = { role: "seller" };
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    {/* {user.role === "customer" ? <CustomerApp /> : <SellerApp />} */}
    <CustomerApp />
  </BrowserRouter>
  // </StrictMode>
);
