import "./src/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "./src/components/layout/header/Header.jsx";
import Home from "./src/components/home/Home.jsx";
import Signup from "./src/components/user/Signup.jsx";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
