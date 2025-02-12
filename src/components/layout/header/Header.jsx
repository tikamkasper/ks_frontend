import React from "react";
import HeaderTop from "./HeaderTop.jsx";
import HeaderMiddle from "./HeaderMiddle.jsx";
import CategaryNav from "./CategaryNav.jsx";

const Header = () => {
  return (
    <header>
      <HeaderTop />
      <HeaderMiddle />
      <CategaryNav />
      <hr />
    </header>
  );
};

export default Header;
