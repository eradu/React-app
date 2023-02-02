import React, { useState } from "react";
import { Link } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { IoShuffle } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { HiOutlineClock } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";

// import logo from "../img/logo.png";

const WebNavbar = () => {
  const [navState, setNavState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavState(false));

  return (
    <nav>
      <div className="container-mobile">
        <div className="brand">
          <div className="placeholder">
            <img
              src="https://space.xtemos.com/demo/hitek/wp-content/uploads/sites/23/2021/09/hitek-logo-dark.svg"
              alt="logo"
            />
          </div>
        </div>

        <div
          className="links-container py-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cart-mobile">
            <HiOutlineShoppingBag />
          </div>
          <div className="toggle">
            {navState ? (
              <MdClose onClick={() => setNavState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavState(true);
                }}
              />
            )}
            <span className="menu-span">Menu</span>
          </div>

          <div className={`links ${navState ? "responsive-toggle" : ""}`}>
            <div className="input-search">
              <input type="text" placeholder="Search for products" />
              <CiSearch />
            </div>
            <div className="menu-wrapper">
              <ul className="menu-links">
                <li className="menu-items">
                  <Link to="/">
                    <span>Menu</span>
                  </Link>
                </li>
                <li className="categories-items">
                  <Link to="/">
                    <span>Categories</span>
                  </Link>
                </li>
              </ul>
              <ul className="menu">
                <li>
                  <Link to="/">
                    <span>Home</span>
                  </Link>
                  <FiChevronRight className="arrow" />
                </li>
                <li>
                  <Link to="/">
                    <span>Shop</span>
                  </Link>
                  <FiChevronRight className="arrow" />
                </li>
                <li>
                  <Link to="/">
                    <span>Blog</span>
                  </Link>
                  <FiChevronRight className="arrow" />
                </li>
                <li>
                  <Link to="/">
                    <span>About us</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Contact us</span>
                  </Link>
                </li>
                <li className="icon-link">
                  <Link to="/">
                    <IoIosHeartEmpty />
                    <span>Wishlist</span>
                  </Link>
                </li>
                <li className="icon-link">
                  <Link to="/">
                    <IoShuffle />
                    <span>Compare</span>
                  </Link>
                </li>
                <li className="icon-link">
                  <Link to="/">
                    <IoPersonOutline />
                    <span>Login / Register</span>
                  </Link>
                </li>
              </ul>
              <ul className="categories">
                <li>
                  <Link to="/">
                    <span>Audio</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Video</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Photo</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Computers</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Mobile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Appliances</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Music</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Notebooks</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Consoles</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Phone</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="web-navbar">
        <div className="top-wrapper">
          <div className="left">
            <div className="left-phone">
              <FiPhone />
              <span>(0123) 4567 890</span>
            </div>
            <div className="left-prog">
              <HiOutlineClock />
              <span>MON - SAT:08 am - 17 pm</span>
            </div>
            <div className="left-mail">
              <HiOutlineEnvelope />
              <span>HiElectronic@mail.com</span>
            </div>
          </div>
          <div className="right">
            <div className="login">
              <Link to="/">
                <IoPersonOutline />
                <span>Login / Register</span>
              </Link>
            </div>
            <div className="compare">
              <Link to="/">
                <IoShuffle />
                <span>Compare</span>
              </Link>
            </div>
            <div className="wishlist">
              <Link to="/">
                <IoIosHeartEmpty />
                <span>Wishlist</span>
              </Link>
            </div>
            <div className="cash">
              <Link to="/">
                <HiOutlineShoppingBag />
                <span>0 / $0.00</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="bottom-wrapper">
          <div className="container-navbar">
            <div className="navbar-inner">
            <div className="left">
            <div className="logo-container">
              <div className="brand">
                <div className="placeholder">
                  <img
                    src="https://space.xtemos.com/demo/hitek/wp-content/uploads/sites/23/2021/09/hitek-logo-dark.svg"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="center">
            <div className="form">
              <form action="" method="get">
                <div className="search-input">
                  <input type="text" placeholder="Search for products" />
                  <div className="search-select">
                    <input type="hidden" name="" />
                    <a href="/">
                      <span>Select Category</span>
                    </a>
                    <div className="select-dropdown">
                      <div className="select-dropdown-inner">
                        <ul className="sub-menu">
                          <li className="cat-item">
                            <a href="/cat">Select Category</a>
                          </li>
                          <li className="cat-item">
                            <a href="/cat/comp">Computers</a>
                            <ul className="children">
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Accesosories</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Desktops</span>
                                </Link>
                              </li>
                              <li classname="cat-item">
                                <Link to="/">
                                  <span>Monitors</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Notebooks</span>
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li className="cat-item">
                            <a href="/cat/comp">Mobile</a>
                            <ul className="children">
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Cases</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Phones</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Tablets</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Trackers</span>
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li className="cat-item">
                            <a href="/cat/comp">Appliances</a>
                            <ul className="children">
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Air Purifiers</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Blenders</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Kettles</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Shavers</span>
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li className="cat-item">
                            <a href="/cat/comp">Photo</a>
                            <ul className="children">
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Camera Lemses</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Cameras</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Tripods</span>
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li className="cat-item">
                            <a href="/cat/comp">Video</a>
                            <ul className="children">
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Media Players</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Controllers</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Consoles</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Projectors</span>
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li className="cat-item">
                            <a href="/cat/comp">Audio</a>
                            <ul className="children">
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Headsets</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Music</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Headphones</span>
                                </Link>
                              </li>
                              <li className="cat-item">
                                <Link to="/">
                                  <span>Microphones</span>
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="nav-links">
              <ul className="navbar-menu">
                <li className="navbar-menu-items"><Link to="/">
                                  <span>Home</span>
                                </Link></li>
                <li className="navbar-menu-items"><Link to="/">
                                  <span>Shop</span>
                                </Link></li>
                <li className="navbar-menu-items"><Link to="/">
                                  <span>Blog</span>
                                </Link></li>
                <li className="navbar-menu-items"><Link to="/">
                                  <span>Elements</span>
                                </Link></li>
                <li className="navbar-menu-items"><Link to="/">
                                  <span>Pages</span>
                                </Link></li>
              </ul>
            </div>
          </div>
          <div className="right">
            <div className="info">
              <div className="info-icon"></div>
              <div className="info-test">
                <h4>Worldwide</h4>
                <p>Free Shiping</p>
              </div>
            </div>
            <div className="info">
              <div className="info-icon"></div>
              <div className="info-test">
                <h4>24 Support</h4>
                <p>+1 212-334-0212</p>
              </div>
            </div>
          </div>
            </div>
          </div>

        </div>
      </div>

    </nav>
  );
};

export default WebNavbar;
