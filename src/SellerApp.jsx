import { Routes, Route } from "react-router";
import Dashboard from "./components/dashboard/dashboard.jsx";

function SellerApp() {
  return (
    <>
      <Routes>
        <Route path="/seller/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default SellerApp;
