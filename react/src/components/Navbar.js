import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom"; // import Link component

import { UserContext } from "./CredentialContext";
import "../Styles/Navbar.scss";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState();
  const { user, setUser } = useContext(UserContext);
  const [color, changeColor] = useState("#e5e5e5");

  const withouSidebarRoutes = ["/site"];
  const { pathname } = useLocation();
  if (withouSidebarRoutes.some((item) => pathname.includes(item)))
  return null;
  
  const logout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar">
      <h1>Radu's Todo List</h1>
      <div style={{ background: color }} className="links">
        {/* we use Link component instead of anchor tag 'a' and 'to' instead of 'href' */}
        {!user && (
          <Link
            id="welcome-link"
            className={activeLink === "welcome-link" ? "active" : ""}
            onClick={() => {
              setActiveLink("welcome-link");
            }}
            to="/"
          >
            Home
          </Link>
        )}

        {!user && (
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
        )}
         {!user && (
          <Link
            id="site-link"
            className={activeLink === "site-link" ? "active" : ""}
            onClick={() => {
              setActiveLink("site-link");
              changeColor("#FFF")
            }}
            to="/site"
          >
            WebSite
          </Link>
        )}
        {user && (
          <Link className="logout-btn" onClick={logout} to="/">
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
