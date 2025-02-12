import "./App.css";
import { Routes, Route } from "react-router";
import Footer from "./components/layout/footer/Footer.jsx";
import Header from "./components/layout/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import Signup from "./components/user/Signup.jsx";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
