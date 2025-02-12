import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { SlUser } from "react-icons/sl";
import { BsCart4 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../../assets/ks_logo.png";

const HeaderMiddle = () => {
  const [isShowUserDropDown, setIsShowUserDropDown] = useState(false);
  const user = { isAuthenticated: false, role: "admin" };
  const { isAuthenticated, role } = user;
  const userDropDownRef = useRef();
  const userIconRef = useRef();

  window.addEventListener("click", (e) => {
    if (
      e.target !== userDropDownRef.current &&
      e.target !== userIconRef.current
    ) {
      setIsShowUserDropDown(false);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="header-middle">
      <div className="container ">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="search">
          <form onSubmit={handleSubmit}>
            <CiSearch />
            <input
              type="text"
              name="q"
              placeholder="Search for products, brands and more"
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="icons">
          <div className="user">
            <SlUser
              ref={userIconRef}
              onClick={() => setIsShowUserDropDown(!isShowUserDropDown)}
            />
          </div>
          <div className="cart">
            <BsCart4 />
            <div className="badge">
              <span>5</span>
            </div>
          </div>
          <div className="wishlist">
            <FaRegHeart />
          </div>
        </div>
        <div className="hamburger-icon">
          <GiHamburgerMenu />
        </div>
        {isShowUserDropDown && (
          <div className="userDropDown" ref={userDropDownRef}>
            <div className="user-greet">
              {isAuthenticated ? (
                <p>Hello {"Tikam"} !</p>
              ) : (
                <p>Welcome to {"K_SHOP"} !</p>
              )}
            </div>
            <hr />
            <ul>
              {isAuthenticated && (
                <li>
                  <Link onClick={() => setIsShowUserDropDown(false)}>
                    Profile
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link onClick={() => setIsShowUserDropDown(false)}>
                    My Orders
                  </Link>
                </li>
              )}
              {!isAuthenticated && (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setIsShowUserDropDown(false)}
                  >
                    Login/Signup
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link onClick={() => setIsShowUserDropDown(false)}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderMiddle;
