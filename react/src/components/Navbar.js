import { useState } from "react";
import { Link } from "react-router-dom"; // import Link component

import "../Styles/Navbar.scss";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState();

  return (
    <nav className="navbar">
      <h1>Radu's Todo List</h1>
      <div className="links">
        {/* we use Link component instead of anchortag 'a' and 'to' instead of 'href' */}
        <Link
          id="welcome-link"
          className={activeLink === "welcome-link" ? "active" : ""}
          onClick={() => {
            setActiveLink("welcome-link");
          }}
          to="/"
        >
          Welcome
        </Link>
        <Link
          id="todo-link"
          className={activeLink === "todo-link" ? "active" : ""}
          onClick={() => {
            setActiveLink("todo-link");
          }}
          to="/todos"
        >
          ToDo List
        </Link>
        {/* <Link
          id="register-link"
          className={activeLink === "register-link" ? "active" : ""}
          onClick={() => {
            setActiveLink("register-link");
          }}
          to="/register"
        >
          Register
        </Link>
        <Link
          id="login-link"
          className={activeLink === "login-link" ? "active" : ""}
          onClick={() => {
            setActiveLink("login-link");
          }}
          to="/login"
        >
          Login
        </Link> */}
        <Link
          id="about-link"
          className={activeLink === "about-link" ? "active" : ""}
          onClick={() => {
            setActiveLink("about-link");
          }}
          to="/about"
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
